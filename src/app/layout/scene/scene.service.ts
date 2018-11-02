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

  private sample = arr => arr[Math.floor(Math.random() * arr.length)];

  private randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

  public getNewLight(position):THREE.PointLight {
    let color = this.sample(this.colorList);
    let light = new THREE.PointLight(color, this.intensity, this.distance, this.decay);    
    let sphere = new THREE.SphereBufferGeometry( 0.25, 16, 700);
    
    let theta = this.randomNumberInRange(0,360)
    let lambda = this.randomNumberInRange(0,360)


    let material = new THREE.MeshBasicMaterial( { 
      color:color,
      specular: 0x050505,
      shininess: 100
    });

    light.add( new THREE.Mesh( sphere, material) );

    light.position.set( position[0] + (3 * Math.sin(lambda) * Math.cos(theta)), position[1] + (3 * Math.sin(lambda) * Math.sin(theta)), position[2] + (3 * Math.cos(lambda)) );

    light.lambda = lambda;
    light.theta = theta;

    return light;
  }

  public animateLights(lights, position):void {
    for( let light of lights){
      light.theta += 0.01;
      light.lambda += 0.05;
      light.position.set( position[0] + (3 * Math.sin(light.lambda) * Math.cos(light.theta)), position[1] + (3 * Math.sin(light.lambda) * Math.sin(light.theta)), position[2] + (3 * Math.cos(light.lambda)) );
    }
  }
}
