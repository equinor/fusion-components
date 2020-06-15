import {
    FusionPersonElement,
    FusionPersonElementProps
} from './element';

type PersonElementHTMLAttributes = FusionPersonElementProps & React.HTMLAttributes<FusionPersonElement>;

declare global {
    interface HTMLElementTagNameMap {
        "fusion-person": FusionPersonElement;
    }
    namespace JSX {
        interface ReactHTML{
            "fusion-person": React.DetailedHTMLFactory<PersonElementHTMLAttributes, FusionPersonElement>;
        }
        interface IntrinsicElements {
            "fusion-person": React.DetailedHTMLProps<PersonElementHTMLAttributes, FusionPersonElement>;
        }
    }
}

export * from './element';
