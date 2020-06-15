import {
    PersonPhotoElement,
    PersonPhotoElementProps
} from './element';

type PersonPhotoElementHTMLAttributes = PersonPhotoElementProps & React.HTMLAttributes<PersonPhotoElement>;

declare global {
    interface HTMLElementTagNameMap {
        "fusion-person-photo": PersonPhotoElement;
    }
    namespace JSX {
        interface ReactHTML{
            "fusion-person-photo": React.DetailedHTMLFactory<PersonPhotoElementHTMLAttributes, PersonPhotoElement>;
        }
        interface IntrinsicElements {
            "fusion-person-photo": React.DetailedHTMLProps<PersonPhotoElementHTMLAttributes, PersonPhotoElement>;
        }
    }
}

export * from './element';
