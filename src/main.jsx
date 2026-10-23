import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { StoreProvider } from './context/StoreContext.jsx'
import './index.css'

class AppErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Shopwave render error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="wrap py-24 text-center" role="alert">
          <h1 className="text-2xl font-extrabold">Something went wrong</h1>
          <p className="mt-2 text-stone-600">{this.state.error.message || 'This page could not be displayed.'}</p>
          <button type="button" className="btn-primary mt-6" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter><AppErrorBoundary><StoreProvider><App /></StoreProvider></AppErrorBoundary></BrowserRouter>
)
