import { App, Directive } from 'vue'
import permission from './permission'
import waterMarker from './waterMarker'

const directivesList: { [key: string]: Directive } = {
  permission,
  waterMarker,
}

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  },
}

export default directives
