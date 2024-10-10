"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkproducts"] = self["webpackChunkproducts"] || []).push([["src_components_ProductsList_index_tsx"],{

/***/ "./src/components/Fruit/index.tsx":
/*!****************************************!*\
  !*** ./src/components/Fruit/index.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Fruit: function() { return /* binding */ Fruit; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"../node_modules/react/jsx-runtime.js\");\n/* harmony import */ var _images_grapefruit_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/grapefruit.jpg */ \"./src/components/Fruit/images/grapefruit.jpg\");\n/* harmony import */ var _images_apple_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/apple.jpg */ \"./src/components/Fruit/images/apple.jpg\");\n/* harmony import */ var _images_bananas_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/bananas.jpg */ \"./src/components/Fruit/images/bananas.jpg\");\n/* harmony import */ var _images_bowl_fruit1_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/bowl_fruit1.jpg */ \"./src/components/Fruit/images/bowl_fruit1.jpg\");\n/* harmony import */ var _images_guava_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/guava.jpg */ \"./src/components/Fruit/images/guava.jpg\");\n/* harmony import */ var _images_passion_fruit_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/passion_fruit.jpg */ \"./src/components/Fruit/images/passion_fruit.jpg\");\n/* harmony import */ var _images_pineapple1_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/pineapple1.jpg */ \"./src/components/Fruit/images/pineapple1.jpg\");\n/* harmony import */ var _images_pomegranate_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/pomegranate.jpg */ \"./src/components/Fruit/images/pomegranate.jpg\");\n/* harmony import */ var _images_watermelon_jpg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/watermelon.jpg */ \"./src/components/Fruit/images/watermelon.jpg\");\n/* harmony import */ var _images_no_image_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./images/no-image.png */ \"./src/components/Fruit/images/no-image.png\");\n\n\n\n\n\n\n\n\n\n\n\nvar Fruit = function Fruit(_a) {\n  var name = _a.name,\n    _b = _a.width,\n    width = _b === void 0 ? \"200\" : _b,\n    height = _a.height;\n  var imgSrc = \"\";\n  switch (name) {\n    case \"Grapefruit\":\n      imgSrc = _images_grapefruit_jpg__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n      break;\n    case \"Apple\":\n      imgSrc = _images_apple_jpg__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n      break;\n    case \"Banana\":\n      imgSrc = _images_bananas_jpg__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\n      break;\n    case \"Fruit Bowl\":\n      imgSrc = _images_bowl_fruit1_jpg__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\n      break;\n    case \"Guava\":\n      imgSrc = _images_guava_jpg__WEBPACK_IMPORTED_MODULE_5__[\"default\"];\n      break;\n    case \"Passion Fruit\":\n      imgSrc = _images_passion_fruit_jpg__WEBPACK_IMPORTED_MODULE_6__[\"default\"];\n      break;\n    case \"Pineapple\":\n      imgSrc = _images_pineapple1_jpg__WEBPACK_IMPORTED_MODULE_7__[\"default\"];\n      break;\n    case \"Pomegranate\":\n      imgSrc = _images_pomegranate_jpg__WEBPACK_IMPORTED_MODULE_8__[\"default\"];\n      break;\n    case \"Watermelon\":\n      imgSrc = _images_watermelon_jpg__WEBPACK_IMPORTED_MODULE_9__[\"default\"];\n      break;\n    default:\n      imgSrc = _images_no_image_png__WEBPACK_IMPORTED_MODULE_10__[\"default\"];\n  }\n  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"img\", {\n    width: width,\n    height: height || width,\n    src: imgSrc,\n    alt: name\n  });\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Fruit);\n\n//# sourceURL=webpack://products/./src/components/Fruit/index.tsx?");

/***/ }),

/***/ "./src/components/ProductCard/index.tsx":
/*!**********************************************!*\
  !*** ./src/components/ProductCard/index.tsx ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ProductCard: function() { return /* binding */ ProductCard; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"../node_modules/react/jsx-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"webpack/sharing/consume/default/react/react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Card */ \"../node_modules/@mui/material/Card/Card.js\");\n/* harmony import */ var _mui_material_CardActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/CardActions */ \"../node_modules/@mui/material/CardActions/CardActions.js\");\n/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/CardContent */ \"../node_modules/@mui/material/CardContent/CardContent.js\");\n/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Button */ \"../node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/IconButton */ \"../node_modules/@mui/material/IconButton/IconButton.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Typography */ \"../node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/icons-material */ \"webpack/sharing/consume/default/@mui/icons-material/@mui/icons-material\");\n/* harmony import */ var _mui_icons_material__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Fruit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Fruit */ \"./src/components/Fruit/index.tsx\");\n\n\n\n\n\n\n\n\n\n\n// @ts-ignore\nvar events = window.fsEvents;\nvar ProductCard = function ProductCard(_a) {\n  var name = _a.name,\n    price = _a.price,\n    _b = _a.cartView,\n    cartView = _b === void 0 ? false : _b;\n  var _c = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]),\n    cart = _c[0],\n    setCart = _c[1];\n  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {\n    // @ts-ignore\n    var subID = events === null || events === void 0 ? void 0 : events.subscribe(\"cart\", function (_a) {\n      var cart = _a.cart;\n      setCart(cart);\n    });\n    return function () {\n      if (subID) {\n        events === null || events === void 0 ? void 0 : events.unsubscribe(subID);\n      }\n    };\n  }, []);\n  var action = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material_Button__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    size: \"small\",\n    variant: \"contained\",\n    endIcon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_icons_material__WEBPACK_IMPORTED_MODULE_2__.AddShoppingCart, {}),\n    sx: {\n      marginBottom: \"40px\"\n    },\n    onClick: function onClick() {\n      events === null || events === void 0 ? void 0 : events.publish(\"addItem\", {\n        name: name,\n        price: price\n      });\n    },\n    children: \"Add to Cart\"\n  });\n  var itemIndex = cart.findIndex(function (product) {\n    return product.name === name;\n  });\n  var isItemInCart = itemIndex > -1;\n  if (isItemInCart) {\n    var quantity_1 = cart[itemIndex].quantity;\n    action = (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", {\n      style: {\n        display: \"flex\",\n        flexDirection: \"column\",\n        alignItems: \"center\"\n      },\n      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", {\n        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          onClick: function onClick() {\n            events === null || events === void 0 ? void 0 : events.publish(\"removeItem\", {\n              name: name,\n              quantity: 1\n            });\n          },\n          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_icons_material__WEBPACK_IMPORTED_MODULE_2__.Remove, {})\n        }), quantity_1, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n          onClick: function onClick() {\n            events === null || events === void 0 ? void 0 : events.publish(\"addItem\", {\n              name: name\n            });\n          },\n          children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_icons_material__WEBPACK_IMPORTED_MODULE_2__.Add, {})\n        })]\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material_Button__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        size: \"small\",\n        onClick: function onClick() {\n          events === null || events === void 0 ? void 0 : events.publish(\"removeItem\", {\n            name: name,\n            quantity: quantity_1\n          });\n        },\n        endIcon: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_icons_material__WEBPACK_IMPORTED_MODULE_2__.Delete, {}),\n        children: \"Remove\"\n      })]\n    });\n  }\n  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material_Card__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    sx: {\n      display: \"flex\",\n      flexDirection: cartView ? \"row\" : \"column\"\n    },\n    variant: \"outlined\",\n    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        sx: {\n          mb: 1.5\n        },\n        color: \"text.secondary\",\n        gutterBottom: true,\n        children: [name, \" \", isItemInCart && !cartView && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_icons_material__WEBPACK_IMPORTED_MODULE_2__.Check, {\n          sx: {\n            float: \"right\"\n          }\n        })]\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n        style: {\n          display: \"flex\",\n          justifyContent: \"center\"\n        },\n        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Fruit__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n          name: name,\n          width: cartView ? \"75\" : \"150\"\n        })\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        sx: {\n          fontSize: 14\n        },\n        color: \"text.secondary\",\n        gutterBottom: true,\n        children: [\"$\", (price || 0).toFixed(2)]\n      })]\n    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material_CardActions__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n      sx: {\n        justifyContent: \"center\"\n      },\n      children: action\n    })]\n  });\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductCard);\n\n//# sourceURL=webpack://products/./src/components/ProductCard/index.tsx?");

/***/ }),

/***/ "./src/components/ProductsList/index.tsx":
/*!***********************************************!*\
  !*** ./src/components/ProductsList/index.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ProductsList: function() { return /* binding */ ProductsList; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"../node_modules/react/jsx-runtime.js\");\n/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Grid */ \"../node_modules/@mui/material/Grid/Grid.js\");\n/* harmony import */ var _ProductCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ProductCard */ \"./src/components/ProductCard/index.tsx\");\n/* harmony import */ var _products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../products */ \"./src/products.ts\");\n\n\n\n\nvar Product = function Product(_a) {\n  var name = _a.name,\n    price = _a.price;\n  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    item: true,\n    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ProductCard__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n      name: name,\n      price: price\n    })\n  });\n};\nvar ProductsList = function ProductsList() {\n  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    container: true,\n    direction: \"row\",\n    spacing: 2,\n    sx: {\n      justifyContent: \"center\"\n    },\n    children: _products__WEBPACK_IMPORTED_MODULE_2__[\"default\"].map(function (_a) {\n      var name = _a.name,\n        price = _a.price;\n      return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Product, {\n        name: name,\n        price: price\n      }, name);\n    })\n  });\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductsList);\n\n//# sourceURL=webpack://products/./src/components/ProductsList/index.tsx?");

/***/ }),

/***/ "./src/products.ts":
/*!*************************!*\
  !*** ./src/products.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   products: function() { return /* binding */ products; }\n/* harmony export */ });\nvar products = [{\n  name: \"Grapefruit\",\n  price: 1.5\n}, {\n  name: \"Apple\",\n  price: 0.5\n}, {\n  name: \"Guava\",\n  price: 0.75\n}, {\n  name: \"Passion Fruit\",\n  price: 0.75\n}, {\n  name: \"Banana\",\n  price: 0.1\n}, {\n  name: \"Fruit Bowl\",\n  price: 5.25\n}, {\n  name: \"Pineapple\",\n  price: 2.5\n}, {\n  name: \"Pomegranate\",\n  price: 1.25\n}, {\n  name: \"Watermelon\",\n  price: 3.75\n}];\n/* harmony default export */ __webpack_exports__[\"default\"] = (products);\n\n//# sourceURL=webpack://products/./src/products.ts?");

/***/ }),

/***/ "./src/components/Fruit/images/apple.jpg":
/*!***********************************************!*\
  !*** ./src/components/Fruit/images/apple.jpg ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/components/Fruit/images/apple.c956caefed866ed188fae1e4ae6e0540.jpg\");\n\n//# sourceURL=webpack://products/./src/components/Fruit/images/apple.jpg?");

/***/ }),

/***/ "./src/components/Fruit/images/bananas.jpg":
/*!*************************************************!*\
  !*** ./src/components/Fruit/images/bananas.jpg ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/components/Fruit/images/bananas.269a21be440ccabbc453830c29b45a9a.jpg\");\n\n//# sourceURL=webpack://products/./src/components/Fruit/images/bananas.jpg?");

/***/ }),

/***/ "./src/components/Fruit/images/bowl_fruit1.jpg":
/*!*****************************************************!*\
  !*** ./src/components/Fruit/images/bowl_fruit1.jpg ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/components/Fruit/images/bowl_fruit1.9b1427e1092d36a98287ddfe9f1ed1ec.jpg\");\n\n//# sourceURL=webpack://products/./src/components/Fruit/images/bowl_fruit1.jpg?");

/***/ }),

/***/ "./src/components/Fruit/images/grapefruit.jpg":
/*!****************************************************!*\
  !*** ./src/components/Fruit/images/grapefruit.jpg ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/components/Fruit/images/grapefruit.71e77480f637f5feff7d0c00c694f2f3.jpg\");\n\n//# sourceURL=webpack://products/./src/components/Fruit/images/grapefruit.jpg?");

/***/ }),

/***/ "./src/components/Fruit/images/guava.jpg":
/*!***********************************************!*\
  !*** ./src/components/Fruit/images/guava.jpg ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/components/Fruit/images/guava.93db01126a323a58a80b407611d875c1.jpg\");\n\n//# sourceURL=webpack://products/./src/components/Fruit/images/guava.jpg?");

/***/ }),

/***/ "./src/components/Fruit/images/no-image.png":
/*!**************************************************!*\
  !*** ./src/components/Fruit/images/no-image.png ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/components/Fruit/images/no-image.36486fa4a19c9134f8bf9d8cc4474f21.png\");\n\n//# sourceURL=webpack://products/./src/components/Fruit/images/no-image.png?");

/***/ }),

/***/ "./src/components/Fruit/images/passion_fruit.jpg":
/*!*******************************************************!*\
  !*** ./src/components/Fruit/images/passion_fruit.jpg ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/components/Fruit/images/passion_fruit.487a97d853cc6a91a8ccdd551bc7dfbe.jpg\");\n\n//# sourceURL=webpack://products/./src/components/Fruit/images/passion_fruit.jpg?");

/***/ }),

/***/ "./src/components/Fruit/images/pineapple1.jpg":
/*!****************************************************!*\
  !*** ./src/components/Fruit/images/pineapple1.jpg ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/components/Fruit/images/pineapple1.d95ec274375ccba6647f7dc8e08cb702.jpg\");\n\n//# sourceURL=webpack://products/./src/components/Fruit/images/pineapple1.jpg?");

/***/ }),

/***/ "./src/components/Fruit/images/pomegranate.jpg":
/*!*****************************************************!*\
  !*** ./src/components/Fruit/images/pomegranate.jpg ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/components/Fruit/images/pomegranate.7243abac55edb17183dd45572e583ef9.jpg\");\n\n//# sourceURL=webpack://products/./src/components/Fruit/images/pomegranate.jpg?");

/***/ }),

/***/ "./src/components/Fruit/images/watermelon.jpg":
/*!****************************************************!*\
  !*** ./src/components/Fruit/images/watermelon.jpg ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"src/components/Fruit/images/watermelon.a8256efed55701d60516ee062bbbf2b4.jpg\");\n\n//# sourceURL=webpack://products/./src/components/Fruit/images/watermelon.jpg?");

/***/ })

}]);