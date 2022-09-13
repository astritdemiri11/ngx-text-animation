# ngx-text-animation

Text visualization library for Angular.

Official documentation: https://astritdemiri.com/ng-library/ngx-text-animation

Simple example using ngx-text-animation: https://stackblitz.com/github/astritdemiri11/ngx-text-animation-example

Get the complete changelog here: https://github.com/astritdemiri11/ngx-text-animation/releases

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
  * [Import the TextAnimationModule](#1-import-the-textanimationmodule)
    * [SharedModule](#sharedmodule)
  * [Use the directive or the component](#use-the-directive-or-the-component)

## Installation

First you need to install the npm module:

```sh
npm install ngx-text-animation --save
```

Choose the version corresponding to your Angular version:

 Angular       | ngx-text-animation
 ------------- | ---------------
 14 (ivy only) | 1.x+           


## Usage

#### 1. Import the `TextAnimationModule`:

Finally, you can use ngx-text-animation in your Angular project. You have to import `TextAnimationModule` in the root NgModule of your application.

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TextAnimationModule} from 'ngx-text-animation';

@NgModule({
    imports: [
        BrowserModule,
        TextAnimationModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

##### SharedModule

If you use a [`SharedModule`](https://angular.io/guide/sharing-ngmodules) that you import in multiple other feature modules,
you can export the `TextAnimationModule` to make sure you don't have to import it in every module.

```ts
@NgModule({
    exports: [
        CommonModule,
        TextAnimationModule
    ]
})
export class SharedModule { }
```

> Note: Module services are provided in root `@Injectable({ providedIn: 'root' })`, see [`Dependency Injection`](https://angular.io/guide/dependency-injection).

#### Use the directive or the component:

You can either use the `TextDisplayComponent` or the `TextReadComponent` exported by library

This is how you use the **component** for text display:

```html
<text-display>
  <span text>
    <span>This text will scroll on hover, if overflows parent</span>
  </span>
</text-display>
```

This is how you use the **component** for text read:

```html
<text-read #textRead [relativeTo]="textContainer">
</text-read>
<p #textContainer>This text will be typed when textRead.start() is invoked</p>
```
