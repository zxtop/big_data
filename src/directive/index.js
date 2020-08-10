import clickoutside from "./outside";
const install = function(Vue){
    Vue.directive('clickoutside',clickoutside)
}
if (window.Vue){
    window['clickoutside'] = clickoutside;
    Vue.use(install);
}
export default install