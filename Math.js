
/**
 * Turn every value negative
 * @param {Array} u  values
 * @returns the resulting array
 */
function negate(u) {
  var result = [];
  for (var i = 0; i < u.length; ++i) {
    result.push(-u[i]);
  }

  return result;
}

/**
 * Creates an array of arguments
 * @param {number} args 
 * @returns array of arguments
 */
function _argumentsToArray(args) {
  return [].concat.apply([], Array.prototype.slice.apply(args));
}



/**
 * Constructor for a vector of len 4
 * @returns vector of length 4
 */
function vec4() {
  var result = _argumentsToArray(arguments);

  switch (result.length) {
    case 0: result.push(0.0);
    case 1: result.push(0.0);
    case 2: result.push(0.0);
    case 3: result.push(1.0);
  }

  return result.splice(0, 4);
}

/**
 * Constructur vector size 3
 * @returns vector size 3
 */
function vec3() {
  var result = _argumentsToArray(arguments);

  switch (result.length) {
    case 0: result.push(0.0);
    case 1: result.push(0.0);
    case 2: result.push(0.0);
  }

  return result.splice(0, 3);
}

/**
 * Converts degrees to radians
 * @param {number} degrees 
 * @returns radians
 */
function radians(degrees) {
  return degrees * Math.PI / 180.0;
}

/**
 * Matriz identidad
 */
function identity() {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
}
/**
 * given a translation matrix y returns the 3x3 matrix
 * @param {Array} m 4x4 matrix
 * @returns top left corner 3x3 matrix
 */
function get3x3(m) {
  return [
    m[0], m[1], m[2],
    m[4], m[5], m[6],
    m[8], m[9], m[10],
  ];

}
/**
 * multiplies a 3x3 matrix with a size 3 vector
 * @param {Array} matrix 3x3 mstrix
 * @param {Array} vector size 3
 * @returns the multiplication of matrix times vector
 */
function multiplyMatrixByVector(matrix, vector) {
  if (matrix.length !== 9 || vector.length !== 3) {
      throw new Error("Matrix must have 9 elements (3x3) and vector must have 3 elements.");
  }

  let result = [0, 0, 0]; // Initialize a result vector of size 3.

  for (let i = 0; i < 3; i++) {
      result[i] = matrix[i * 3] * vector[0] +
                  matrix[i * 3 + 1] * vector[1] +
                  matrix[i * 3 + 2] * vector[2];
  }

  return result;
}
/**
 * Transformación de traslación
 */
function translate(tx, ty, tz) {
  return [
    1, 0, 0, tx,
    0, 1, 0, ty,
    0, 0, 1, tz,
    0, 0, 0, 1
  ];
}


/**
 * Transformación de escalamiento
 */
function scale(sx, sy, sz) {
  return [
    sx, 0, 0, 0,
    0, sy, 0, 0,
    0, 0, sz, 0,
    0, 0, 0, 1
  ];
}


/**
 * Wrapper function for each rotate
 * @param {number} rad  radians of turn
 * @param {numebr} axis  the vactor to rotate
 * @returns 
 */
function rotate(rad, axis) {
  switch (axis) {
    case 0:
      return rotateX(rad);

    case 1:
      return rotateY(rad);

    case 2:
      return rotateZ(rad);

    default:
      console.log("Wrong axis");
  }
}

/**
 * Transformación de rotación respecto al eje X
 */
function rotateX(rad) {
  let c = Math.cos(rad);
  let s = Math.sin(rad);

  return [
    1, 0, 0, 0,
    0, c, -s, 0,
    0, s, c, 0,
    0, 0, 0, 1
  ];
}

/**
 * Transformación de rotación respecto al eje Y
 */
function rotateY(rad) {
  let c = Math.cos(rad);
  let s = Math.sin(rad);

  return [
    c, 0, s, 0,
    0, 1, 0, 0,
    -s, 0, c, 0,
    0, 0, 0, 1
  ];
}

/**
 * Transformación de rotación respecto al eje Z
 */
function rotateZ(rad) {
  let c = Math.cos(rad);
  let s = Math.sin(rad);

  return [
    c, -s, 0, 0,
    s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];
}

/**
 * Producto cruz de dos vectores
 */
function cross(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}

/**
 * Suma de dos vectores
 */
function add(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z
  };
}

/**
 * Resta de dos vectores
 */
function subtract(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z
  };
}

/**
 * Distancia entre dos puntos
 */
function distance(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2));
}

/**
 * Returns a rotation array that can be applied to object to transform their positioning 
 * on the 3D space
 * @param {number} angle the angle of the turn
 * @param {Array} axis the axis upon which to base the turn
 * @returns resulting rotation array 
 */
function rotate( angle, axis )
{

    var x = axis[0];
    var y = axis[1];
    var z = axis[2];

    var c = Math.cos( radians(angle) );
    var omc = 1.0 - c;
    var s = Math.sin( radians(angle) );

    var result = [
         x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s, 0.0 ,
         x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s, 0.0 ,
         x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c,   0.0 ,
        0,0,0,1]
    ;

    return result;
}

/**
 * Normalización de un vector
 */
function normalize(v) {
  var length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

  if (length > 0.00001) {
    return {
      x: v.x / length,
      y: v.y / length,
      z: v.z / length
    };
  } else {
    return { x: 0, y: 0, z: 0 };
  }
}

/**
 * Transformación de la cámara
 */
function lookAt(cameraPos, coi, up) {
  let w = normalize(subtract(cameraPos, coi));
  let u = normalize(cross(up, w));
  let v = normalize(cross(w, u));

  let base = [
    u.x, u.y, u.z, 0,
    v.x, v.y, v.z, 0,
    w.x, w.y, w.z, 0,
    0, 0, 0, 1
  ];
  let trans = [
    1, 0, 0, -cameraPos.x,
    0, 1, 0, -cameraPos.y,
    0, 0, 1, -cameraPos.z,
    0, 0, 0, 1
  ];

  return multiply(base, trans);
}

/**
 * Proyección en perspectiva
 */
function perspective(theta, aspect, n, f) {
  let c = 1 / Math.tan(theta / 2);

  return [
    c / aspect, 0, 0, 0,
    0, c, 0, 0,
    0, 0, -(f + n) / (f - n), -(2 * n * f) / (f - n),
    0, 0, -1, 0
  ];
}

/**
 * Multiplicación de una matriz con un vector
 */
function multiplyVector(M, v) {
  if (v.w == undefined) {
    v.w = 1;
  }

  return {
    x: M[0] * v.x + M[1] * v.y + M[2] * v.z + M[3] * v.w,
    y: M[4] * v.x + M[5] * v.y + M[6] * v.z + M[7] * v.w,
    z: M[8] * v.x + M[9] * v.y + M[10] * v.z + M[11] * v.w,
    w: M[12] * v.x + M[13] * v.y + M[14] * v.z + M[15] * v.w,
  };
}

/**
 * Multiplies 2 3x3 matrices.
 * @param {Array} a length 3
 * @param {Array} b length 3
 * @returns the multiplication of both
 */
function multiply3x3(a, b) {
  let a00 = a[0], a01 = a[1], a02 = a[2];
  let a10 = a[3], a11 = a[4], a12 = a[5];
  let a20 = a[6], a21 = a[7], a22 = a[8];

  let b00 = b[0], b01 = b[1], b02 = b[2];
  let b10 = b[3], b11 = b[4], b12 = b[5];
  let b20 = b[6], b21 = b[7], b22 = b[8];

  let res = [];
  res[0] = a00 * b00 + a01 * b10 + a02 * b20;
  res[1] = a00 * b01 + a01 * b11 + a02 * b21;
  res[2] = a00 * b02 + a01 * b12 + a02 * b22;
  res[3] = a10 * b00 + a11 * b10 + a12 * b20;
  res[4] = a10 * b01 + a11 * b11 + a12 * b21;
  res[5] = a10 * b02 + a11 * b12 + a12 * b22;
  res[6] = a20 * b00 + a21 * b10 + a22 * b20;
  res[7] = a20 * b01 + a21 * b11 + a22 * b21;
  res[8] = a20 * b02 + a21 * b12 + a22 * b22;

  return res;
}


/**
 * Multiplicación de dos matrices
 */
function multiply(a, b) {
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];
  let a30 = a[12];
  let a31 = a[13];
  let a32 = a[14];
  let a33 = a[15];

  let b00 = b[0];
  let b01 = b[1];
  let b02 = b[2];
  let b03 = b[3];
  let b10 = b[4];
  let b11 = b[5];
  let b12 = b[6];
  let b13 = b[7];
  let b20 = b[8];
  let b21 = b[9];
  let b22 = b[10];
  let b23 = b[11];
  let b30 = b[12];
  let b31 = b[13];
  let b32 = b[14];
  let b33 = b[15];

  let res = [];
  res[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
  res[1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
  res[2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
  res[3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
  res[4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
  res[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
  res[6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
  res[7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
  res[8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
  res[9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
  res[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
  res[11] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
  res[12] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
  res[13] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
  res[14] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
  res[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
  return res;
}