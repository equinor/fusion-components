import { LitElement, customElement, html, property, PropertyValues, queryAsync } from 'lit-element';
import { until } from 'lit-html/directives/until';
import { guard } from 'lit-html/directives/guard';

import { PersonDetails, IHttpClient, IFusionContext, PersonAccountType } from '@equinor/fusion';

import fallbackIcon from './icons/fallback.svg';
import styles from './styles';

/** @TODO move me */
const globalEquinorFusionContextKey = '74b1613f-f22a-451b-a5c3-1c9391e91e68';

const fusionContext = (): IFusionContext => window[globalEquinorFusionContextKey];

/** @TODO handle exceptions */
const getPerson = async (id: string): Promise<PersonDetails> => {
    const { data } = await fusionContext().http.apiClients.people.getPersonDetailsAsync(id);
    return data as PersonDetails;
}

const resolveImageSrc = (id: string): string => {
    return fusionContext().http.resourceCollections.people.getPersonPhoto(id);
};

const jsonParser = <T extends any>(str: string): T => JSON.parse(str) as T;


export type PhotoSize = 'xlarge' | 'large' | 'medium' | 'small';
export type PersonType = 'consultant' | 'employee' | 'externalhire' | 'local';

export interface PersonPhotoElementProps {
    person?: string;
    details?: PersonDetails | string;
    size?: PhotoSize;
    type?: PersonAccountType;
    compact?: boolean;

    refreshDetails?: () => Promise<void>;
}

const loadImage = (src: string) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.addEventListener('load', resolve, { once: true, passive: true });
        image.addEventListener('error', reject, { once: true, passive: true });
    });
}


@customElement('fusion-person-photo')
export class PersonPhotoElement extends LitElement implements PersonPhotoElementProps {

    static styles = styles;

    @property({ reflect: true })
    person: string;

    @property({ reflect: true })
    size?: PhotoSize;

    @property({ reflect: true })
    type?: PersonAccountType;

    @property({ type: Boolean, reflect: true })
    compact?: boolean;

    @property({ type: Object, converter: jsonParser, reflect: false })
    details?: PersonDetails;

    @queryAsync('#container')
    container: Promise<HTMLDivElement>;

    public async refreshDetails() {
        return this.updateDetails();
    }

    public render() {
        const image = guard(this.person, () => until(
            this.renderImage(),
            html`<span class="skeleton"></span>`
        ));
        return html`
            <div id="container">
                ${image}
                <div id="presens"></div>
            </div>`;
    }

    protected async renderImage() {
        try {
            const source = resolveImageSrc(this.person);
            await loadImage(source);
            const thumbnail = document.createElement('div');
            thumbnail.id = "thumbnail";
            thumbnail.style.backgroundImage = `url(${source})`;
            return thumbnail;
        } catch (err) {
            return fallbackIcon;
        }
    }

    protected async updateDetails(force?: boolean) {
        if (force || this.person !== this.details?.azureUniqueId) {
            this.details = await getPerson(this.person);
        }
    }

    protected updateAttributes() {
        this.person = this.details?.azureUniqueId;
        this.type = this.details?.accountType;
    }

    protected async updated(changedProperties: PropertyValues) {
        super.update(changedProperties);
        changedProperties.has('person') && this.updateDetails();
        changedProperties.has('details') && this.updateAttributes();
    }
}