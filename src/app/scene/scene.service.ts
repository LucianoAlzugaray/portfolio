import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SceneService {
 
  canvas:HTMLCanvasElement;

  private colorList = [0xff0040, 0x0040ff, 0x80ff80, 0xffaa00, 0x00ffaa, 0xff1100];
  private intensity = 3;
  private distance = 100;
  private decay = 2.0;
  constructor() { }

  public getNewLight():THREE.PointLight {
    let color = this.sample(this.colorList);
    let light = new THREE.PointLight(color, this.intensity, this.distance, this.decay);    
    let sphere = new THREE.SphereBufferGeometry( 0.25, 16, 8 );
    
    let theta = this.randomNumberInRange(0,360)
    let lambda = this.randomNumberInRange(0,360)

    light.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color } ) ) );

    light.position.set( 3 * Math.sin(lambda) * Math.cos(theta), 3 * Math.sin(lambda) * Math.sin(theta), 3 * Math.cos(lambda) );

    light.lambda = lambda;
    light.theta = theta;

    return light;
  }

  private sample = arr => arr[Math.floor(Math.random() * arr.length)];

  private randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

  public animateLights(lights):void {
    for( let light of lights){
      light.theta += 0.01;
      light.lambda += 0.05;
      light.position.set( 3 * Math.sin(light.lambda) * Math.cos(light.theta), 3 * Math.sin(light.lambda) * Math.sin(light.theta), 3 * Math.cos(light.lambda) );
    
    }
  }
}
