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
  private camera : THREE.PerspectiveCamera;
  private renderer : THREE.WebGLRenderer;
  private lights: THREE.PointLight[] = [];
  private directionalLight: THREE.DirectionalLight;
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
  }

  private createElements(): void {
    
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
    farClippingPane: number = 1100
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

  ngAfterViewInit():void {
    this.createScene();
    this.createElements();
    this.createCamera();
    this.startRendering();
  }
  
  animate():void {
    requestAnimationFrame( this.animate.bind(this) );
    
    this.sceneService.animateLights(this.lights)

    this.renderer.render( this.scene, this.camera );
  }
}
