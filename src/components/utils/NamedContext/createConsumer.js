import { Component } from "react";
import PropTypes from "prop-types";
import { ensureContext } from "./helpers";

const registerConsumer = (name, defaultValue, listner) => {
    const context = ensureContext(name, defaultValue);

    const { listners } = context;

    listners.push(listner);
    return () => listners.splice(listners.indexOf(listner), 1);
};

export default (name, defaultValue) =>
    class NamedContextConsumer extends Component {
        static propTypes = {
            children: PropTypes.node.isRequired,
        };

        constructor(props) {
            super(props);

            const context = ensureContext(name, defaultValue);

            this.state = {
                value: context.value,
            };
        }

        componentDidMount() {
            this.unregisterConsumer = registerConsumer(
                name,
                defaultValue,
                value => {
                    this.setState({ value });
                }
            );
        }

        componentWillUnmount() {
            this.unregisterConsumer();
        }

        render() {
            const { children } = this.props;
            const { value } = this.state;

            return children(value);
        }
    };
