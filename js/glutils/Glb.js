/**
 * @license
 * Redistribution and use in source and binary forms ...
 * A (hopefully) very thin layer of boilerplate and helpful utilities for WebGL
 *
 * Dependencies:
 *  None
 *
 * Copyright 2016 Carnegie Mellon University. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are
 * permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of
 *    conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list
 *    of conditions and the following disclaimer in the documentation and/or other materials
 *    provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY CARNEGIE MELLON UNIVERSITY ''AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CARNEGIE MELLON UNIVERSITY OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those of the
 * authors and should not be interpreted as representing official policies, either expressed
 * or implied, of Carnegie Mellon University.
 *
 * Authors:
 *  Gabriel O'Donnell (gabrielo@cmu.edu)
 *
 */

function Glb(gl) {
  this.gl = gl;
  this._shaderCache = {};
  this._programCache = {};
};

// Return compiled shader for type and source.
// If same type and source has already been compiled, return
//
// type should be gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
Glb.prototype._shaderFromSource = function(type, source) {
  var cache = this._shaderCache[source];
  if (!cache) {
    cache = this._shaderCache[source] = {};
  }
  var shader = cache[type];
  if (!shader) {
    shader = cache[type] = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error('Compiling shader, ' + this.gl.getShaderInfoLog(shader));
    }
  }
  return shader;
}

// Return compiled and linked program for vertex and fragment shader sources.
// If identical program has already been compiled and linked, return it.
Glb.prototype.programFromSources = function(vertexSource, fragmentSource) {
  var cache = this._programCache[vertexSource];
  if (!cache) {
    cache = this._programCache[vertexSource] = {};
  }
  var program = cache[fragmentSource];
  if (!program) {
    //console.log('Creating shader program');
    program = cache[fragmentSource] = this.gl.createProgram();
    this.gl.attachShader(program,
      this._shaderFromSource(this.gl.VERTEX_SHADER, vertexSource));
    this.gl.attachShader(program,
      this._shaderFromSource(this.gl.FRAGMENT_SHADER, fragmentSource));
    this.gl.linkProgram(program);
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      throw new Error('Linking shader program, ' + this.gl.getProgramInfoLog(program));
    }
    this._addAttribsAndUniformsToProgram(program);
  }

  return program;
}

Glb.prototype._addAttribsAndUniformsToProgram = function(program) {
  if (this.gl.getProgramParameter(program, this.gl.ACTIVE_ATTRIBUTES) == 0) {
    throw new Error('Program has no active attributes');
  }
  for (var i = this.gl.getProgramParameter(program, this.gl.ACTIVE_ATTRIBUTES) - 1; i >= 0; i--) {
    var name = this.gl.getActiveAttrib(program, i).name;
    program[name] = this.gl.getAttribLocation(program, name);
  }

  for (var i = this.gl.getProgramParameter(program, this.gl.ACTIVE_UNIFORMS) - 1; i >= 0; i--) {
    var name = this.gl.getActiveUniform(program, i).name;
    program[name] = this.gl.getUniformLocation(program, name);
  }
}

Glb.prototype.createTexture = function(filter, data, width, height) {
  var gl = this.gl;
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  if (data instanceof Uint8Array) {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  } else {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
  }
  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
}

Glb.prototype.bindTexture = function(texture, unit) {
  var gl = this.gl;
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, texture);
}

Glb.prototype.bindFramebuffer = function(framebuffer, texture) {
  var gl = this.gl;
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  if (texture) {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  }
}

Glb.prototype.bindAttribute = function(buffer, attribute, numComponents) {
  var gl = this.gl;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(attribute);
  gl.vertexAttribPointer(attribute, numComponents, gl.FLOAT, false, 0, 0);
}


Glb.prototype.createBuffer = function(array) {
  var buffer = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, array, this.gl.STATIC_DRAW);
  return buffer;
}

Glb.fixedSizePointVertexShader =
  'attribute vec4 aWorldCoord;\n' +
  'uniform mat4 uTransform;\n' +

  'void main() {\n' +
  '  gl_Position = uTransform * aWorldCoord;\n' +
  '  gl_PointSize = 50.0;\n' +
  '}\n';

Glb.solidColorFragmentShader =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.25, 0.25, 1.0);\n' +
  '}';

Glb.vectorTileVertexShader =
  'attribute vec4 worldCoord;\n' +
  'attribute float time;\n' +

  'uniform mat4 mapMatrix;\n' +
  'uniform float maxTime;\n' +
  'uniform float minTime;\n' +

  'void main() {\n' +
  '  if (time < minTime || time > maxTime) {\n' +
  '    gl_Position = vec4(-1,-1,-1,-1);\n' +
  '  } else {\n' +
  '    gl_Position = mapMatrix * worldCoord;\n' +
  '  }\n' +
  '}';

Glb.vectorTileFragmentShader =
  'void main() {\n' +
  '  gl_FragColor = vec4(.0, 1., .15, 1.0);\n' +
  '}\n';
