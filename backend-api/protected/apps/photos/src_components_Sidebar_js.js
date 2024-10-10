"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkproducts"] = self["webpackChunkproducts"] || []).push([["src_components_Sidebar_js"],{

/***/ "./src/components/Sidebar.js":
/*!***********************************!*\
  !*** ./src/components/Sidebar.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Sidebar)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"webpack/sharing/consume/default/react/react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n/* import {\r\n    Card,\r\n    Typography,\r\n    List,\r\n    ListItem,\r\n    ListItemPrefix,\r\n    ListItemSuffix,\r\n    Chip,\r\n} from \"@material-tailwind/react\"; */\n\nfunction Sidebar(props) {\n  var _app$settings;\n  const {\n    path,\n    query,\n    hostReact,\n    controls,\n    app,\n    router\n  } = props;\n  const {\n    Card,\n    Typography,\n    List,\n    ListItem\n  } = controls;\n  const category = path[2] || '';\n  const categories = app === null || app === void 0 || (_app$settings = app.settings) === null || _app$settings === void 0 ? void 0 : _app$settings.categories.filter(c => c.active);\n  //  hostReact.useEffect(() => {\n\n  /*   if (query)\r\n        try {\r\n            query('app', {\r\n                where: { name: \"photo\" }\r\n            }).then(app => {\r\n    \r\n                setCats(app[0].settings.categories)\r\n            })\r\n        } catch (error) {\r\n            console.log(error)\r\n        }\r\n  */\n  //}, [query])\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Card, {\n    className: \"h-[calc(100vh-2rem)] w-full max-w-[20rem] p-0 shadow-xl shadow-blue-gray-900/5\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"mb-2 p-2\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Typography, {\n    variant: \"h5\",\n    color: \"blue-gray\"\n  }, \"Categories\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(List, null, categories && categories.map(c => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ListItem, {\n    style: {\n      background: category === c ? '#cccccc' : ''\n    },\n    onClick: () => {\n      router.push(\"/\".concat(path[0], \"/category/\").concat(c.name));\n    }\n  }, c.name))));\n}\n\n//# sourceURL=webpack://products/./src/components/Sidebar.js?");

/***/ })

}]);