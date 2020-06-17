function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}var render=function render(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c("div",{staticClass:"wrapper"},[_vm._v("\n  button component\n")])};var staticRenderFns=[];render._withStripped=true;//
//
//
//
//
//
// import './button.scss'
export default{render,staticRenderFns,name:"XiaoButton",data(){return{}},mounted(){var _this=this;return _asyncToGenerator(function*(){yield _this.promise})()},methods:{c(){console.log(12)},promise(){return new Promise((resolve,reject)=>{resolve(1)})}}};