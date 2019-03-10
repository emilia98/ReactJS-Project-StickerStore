import React from 'react';

function withCreateService(Component, service) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            console.log(props);
            this.service = service;
        }

        render() {
            

            return (
                <Component />
            )
        }
    }
}

export default withCreateService;