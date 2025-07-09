import { App, Directive } from 'vue'
import permission from './permission'
import waterMarker from './waterMarker'
import throttle from './throttle'
import debounce from './debounce'

const directivesList: { [key: string]: Directive } = {
  permission,
  waterMarker,
  throttle,
  debounce,
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  },
}

export default directives
