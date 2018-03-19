import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
      info: '',
    };
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info,
    });
  }
  render() {
    console.log("EB render");
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="container">
        
          <h1>Something went wrong.</h1>
          <p>Error: {this.state.error.toString()}</p>
          <p>

          {this.state.info.componentStack}
          </p>

        </div>
      );
    }
    return this.props.children;
  }
}