import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ChunkErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Lazy loading chunk error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          role="alert"
          className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto my-12"
        >
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] font-display mb-2">
            Temporary Network Interruption
          </h2>
          <p className="text-xs text-[var(--text-muted)] mb-6 leading-relaxed">
            A dynamic resource chunk could not be retrieved from the network. This typically happens during connection drops or newly deployed bundle refreshes.
          </p>
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload & Reconnect</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
