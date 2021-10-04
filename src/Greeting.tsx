import React from "react";

interface GreetingProps {
    name?: string
}

interface GreetingState {
    message: string
}

export default class Greeting extends React.Component<GreetingProps, GreetingState> {
    constructor(props: GreetingProps) {
        super(props);
        this.state = {
            message: `Hello from, ${props.name}`
        }
    }

    render() {
        if(!this.props.name) {
            return (
                <div>No name given</div>
            )
        }

        return <div>
            {this.state.message}
        </div>
    }
}