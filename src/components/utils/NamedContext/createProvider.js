import { Component } from "react";
import PropTypes from "prop-types";
import { contextMounted, contextUpdated, contextUnmounted } from "./helpers";

export default name =>
    class NamedContextProvider extends Component {
        static propTypes = {
            value: PropTypes.shape.isRequired,
            children: PropTypes.node.isRequired,
        };

        componentDidMount() {
            const { value } = this.props;
            contextMounted(name);
            contextUpdated(name, value);
        }

        componentDidUpdate(prevProps) {
            const { value } = this.props;

            if (value !== prevProps.value) {
                contextUpdated(name, value);
            }
        }

        componentWillUnmount() {
            contextUnmounted(name);
        }

        render() {
            const { children } = this.props;

            return children;
        }
    };
