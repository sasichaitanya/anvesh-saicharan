import './graph-class.css'

// components
import { FlameGraph } from './components/flame.graph'
class GraphClass {
  flameGraphEvent: any

  constructor(domId: string, data: any) {
    this.flameGraphEvent = new FlameGraph()
    this.flameGraphEvent.testFun(domId, data)
  }
}

export { GraphClass }
