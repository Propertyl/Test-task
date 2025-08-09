import { Component, type ErrorInfo, type ReactNode } from "react";
import type { ErrorBoundaryProps, ErrorBoundaryStates } from "../types/global";

class ErrorBoundary extends Component<ErrorBoundaryProps,ErrorBoundaryStates> {
  public state:ErrorBoundaryStates = {
    hasError:false,
    error:null
  }

  public static getDerivedStateFromError(error:Error) {
    return {hasError:true,error:error};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Caught an error:',error,errorInfo);
  }

  public render(): ReactNode {
    if(this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;