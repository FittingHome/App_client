import * as THREE from './libs/three/three.module.js';
import { FBXLoader } from './libs/three/jsm/FBXLoader.js';
import { LoadingBar } from './libs/LoadingBar.js';

class App{
    init(){
        const container = document.createElement( 'div' );
		document.body.appendChild( container );
        
        this.loadingBar = new LoadingBar();
        this.loadingBar.visible = false;

		this.assetsPath = './assets/';
        
		this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );
		this.camera.position.set( 0, 1.6, 0 );
        
		this.scene = new THREE.Scene();

		const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        ambient.position.set( 0.5, 1, 0.25 );
		this.scene.add(ambient);
			
		this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.outputEncoding = THREE.sRGBEncoding;
		container.appendChild( this.renderer.domElement );
        
        this.reticle = new THREE.Mesh(
            new THREE.RingBufferGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
            new THREE.MeshBasicMaterial()
        );
        
        this.reticle.matrixAutoUpdate = false;
        this.reticle.visible = false;
        this.scene.add( this.reticle );
        
        this.setupXR();
		
		window.addEventListener('resize', this.resize.bind(this) );
    }

    setupXR(){
        this.renderer.xr.enabled = true;
        
        if ( 'xr' in navigator ) {

			navigator.xr.isSessionSupported( 'immersive-ar' ).then( ( supported ) => {

                if (supported){
                    const collection = document.getElementsByClassName("ar-button");
                    [...collection].forEach( el => {
                        el.style.display = 'block';
                    });
                }
			} );
            
		} 
        
        const self = this;

        this.hitTestSourceRequested = false;
        this.hitTestSource = null;
        
        function onSelect() {
            if (self.model===undefined) return;
            
            if (self.reticle.visible){
                self.model.position.setFromMatrixPosition( self.reticle.matrix );
                self.model.visible = true;
            }
        }

        this.controller = this.renderer.xr.getController( 0 );
        this.controller.addEventListener( 'select', onSelect );
        
        this.scene.add( this.controller );
    }
	
    resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
    	this.camera.updateProjectionMatrix();
    	this.renderer.setSize( window.innerWidth, window.innerHeight ); 
    }
    
	async showModel(id) {
        this.init();
        this.initAR();
        
		const loader = new FBXLoader().setPath(this.assetsPath);
        const self = this;
        
        const response = await fetch(`http://91.172.40.53:8080/model?folder=bodies&filename=${id}`);
        const buffer = await response.arrayBuffer();

        this.loadingBar.visible = true;
		
        var object = loader.parse(buffer, '');
        self.scene.add( object );
        self.model = object;
        self.model.scale.set(0.001, 0.001, 0.001);
        self.model.visible = false;
        self.loadingBar.visible = false;
        self.renderer.setAnimationLoop( self.render.bind(self) );

		// Load a glTF resource
		// loader.load(
		// 	// resource URL
		// 	`chair.fbx`,
		// 	// called when the resource is loaded
		// 	function ( object ) {

		// 		self.scene.add( object );
        //         self.model = object;
        //         self.model.scale.set(0.05, 0.05, 0.05);
        //         self.model.visible = false; 
                
        //         self.loadingBar.visible = false;
                
        //         self.renderer.setAnimationLoop( self.render.bind(self) );
		// 	},
		// 	// called while loading is progressing
		// 	function ( xhr ) {

		// 		self.loadingBar.progress = (xhr.loaded / xhr.total);
				
		// 	},
		// 	// called when loading has errors
		// 	function ( error ) {

		// 		console.log( 'An error happened' );

		// 	}
		// );
	}			
    
    initAR(){
        let currentSession = null;
        const self = this;
        
        const sessionInit = { requiredFeatures: [ 'hit-test' ] };
        
        
        function onSessionStarted( session ) {

            session.addEventListener( 'end', onSessionEnded );

            self.renderer.xr.setReferenceSpaceType( 'local' );
            self.renderer.xr.setSession( session );
       
            currentSession = session;
            
        }

        function onSessionEnded( ) {

            currentSession.removeEventListener( 'end', onSessionEnded );

            currentSession = null;
            
            if (self.model !== null){
                self.scene.remove( self.model );
                self.model = null;
            }
            
            self.renderer.setAnimationLoop( null );

        }

        if ( currentSession === null ) {

            navigator.xr.requestSession( 'immersive-ar', sessionInit ).then( onSessionStarted );

        } else {

            currentSession.end();

        }
    }
    
    requestHitTestSource(){
        const self = this;
        
        const session = this.renderer.xr.getSession();

        session.requestReferenceSpace( 'viewer' ).then( function ( referenceSpace ) {
            
            session.requestHitTestSource( { space: referenceSpace } ).then( function ( source ) {

                self.hitTestSource = source;

            } );

        } );

        session.addEventListener( 'end', function () {

            self.hitTestSourceRequested = false;
            self.hitTestSource = null;
            self.referenceSpace = null;

        } );

        this.hitTestSourceRequested = true;

    }
    
    getHitTestResults( frame ){
        const hitTestResults = frame.getHitTestResults( this.hitTestSource );

        if ( hitTestResults.length ) {
            
            const referenceSpace = this.renderer.xr.getReferenceSpace();
            const hit = hitTestResults[ 0 ];
            const pose = hit.getPose( referenceSpace );

            this.reticle.visible = true;
            this.reticle.matrix.fromArray( pose.transform.matrix );

        } else {

            this.reticle.visible = false;

        }

    }
    
	render( timestamp, frame ) {

        if ( frame ) {
            if ( this.hitTestSourceRequested === false ) this.requestHitTestSource( )

            if ( this.hitTestSource ) this.getHitTestResults( frame );
        }

        this.renderer.render( this.scene, this.camera );

    }
}

export { App };