import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { SceneService } from './scene.service';
import * as THREE from 'three';

@Component({
  selector: 'scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements AfterViewInit {

  private scene : THREE.Scene;
  private oclscene: THREE.Scene;
  private camera : THREE.PerspectiveCamera;
  private renderer : THREE.WebGLRenderer;
  private lights: THREE.PointLight[] = [];
  private lightSphere: THREE.PointLight;
  private directionalLight: THREE.DirectionalLight;
  private readonly DEFAULT_LAYER = 0;
  private readonly OCCLUSION_LAYER = 1;
  
  @ViewChild('canvas')
  private canvasRef: ElementRef;

  constructor(private sceneService:SceneService) { 
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private getAspectRatio(): number {
    let height = this.canvas.clientHeight;
    if (height === 0) {
        return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private createScene():void {
    this.scene = new THREE.Scene();
    
    this.oclscene = new THREE.Scene();
    this.oclscene.add( new THREE.AmbientLight( 0xffffff ) );
  }

  private createElements(): void {
    
    // a white sphere serves as the light in the scene used 
    // to create the effect
    var geometry = new THREE.SphereBufferGeometry( 1, 16, 16 );
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    this.lightSphere = new THREE.Mesh( geometry, material );
    this.lightSphere.layers.set( this.OCCLUSION_LAYER );
    // layers are a newer addition to three.js ( as of r74 )
    // they control what objects a camera is able to see. This way 
    // only one scene needs to be used for both rendering passes
    this.scene.add( this.lightSphere );

    
    // CORE
    let sphere = new THREE.Mesh( 
    new THREE.SphereBufferGeometry(2,32,32 ), 
    new THREE.MeshStandardMaterial( {color: 0x999999} ) 
    );
    sphere.position.x= 0;
    sphere.position.y= 0;
    sphere.position.z= 0;
    

    this.scene.add( sphere );
    
    this.makeLightList(10);
    
    this.directionalLight = new THREE.DirectionalLight(0x444444, 2);

    this.directionalLight.position.x = -5;
    this.directionalLight.position.y = 0;
    this.directionalLight.position.z = 10;

    this.scene.add(this.directionalLight);
  }

  private createCamera(
    fieldOfView:number = 60,
    nearClippingPane: number = 0.1,
    farClippingPane: number = 200
  ) {
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearClippingPane,
        farClippingPane
    );

    // Set position and look at
    this.camera.position.x = -5;
    this.camera.position.y = 0;
    this.camera.position.z = 10;

    // // OCCLUSION SCENE
    // this.oclcamera = new THREE.PerspectiveCamera( fieldOfView, aspectRatio, nearClippingPane, farClippingPane ); 
    // this.oclcamera.position = this.camera.position;
  }

  private startRendering():void {
    this.renderer = new THREE.WebGLRenderer({canvas:this.canvas});
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(this.renderer.domElement);
    
    this.animate();   
  }

  private makeLightList(quantity:number):void {
    for(let i = 0; i < quantity; i++) {
      let light = this.sceneService.getNewLight();
      this.scene.add(light);
      this.lights.push(light);
    }
  }

  private prepareScene(){
    // Base object
//     var zmesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
//     zmesh.position.set( x, y, z );
//     zmesh.scale.set( 3, 3, 3 );
//     this.scene.add( zmesh );
//  
    // Occluding object
//     var gmat = new THREE.MeshBasicMaterial( { color: 0x000000, map: null } );
//     var geometryClone = THREE.GeometryUtils.clone( geometry );
//     var gmesh = new THREE.Mesh(geometryClone, gmat);
//     gmesh.position = zmesh.position;
//     gmesh.rotation = zmesh.rotation;
//     gmesh.scale = zmesh.scale;
//     this.oclscene.add(gmesh);
  }

  ngAfterViewInit():void {
    this.createScene();
    this.createElements();
    this.prepareScene();
    this.createCamera();
    this.startRendering();
  }
  
  animate():void {
    requestAnimationFrame( this.animate.bind(this) );
    
    this.sceneService.animateLights(this.lights)

    this.renderer.render( this.scene, this.camera );
  }
}
