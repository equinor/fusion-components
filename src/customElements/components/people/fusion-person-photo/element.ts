import { html, property, fusionElement } from '../../base';
import { createThumbnail } from '../../../utils';
import { guard, until } from '../../../directives';

import FusionPersonElement, { FusionPersonElementProps } from '../fusion-person/element';

import { PersonAccountType } from '@equinor/fusion';

import fallbackIcon from './icons/fallback.svg';

import styles from './styles';

export type PhotoSize = 'xlarge' | 'large' | 'medium' | 'small';

export interface PersonPhotoElementProps extends FusionPersonElementProps {
    size?: PhotoSize;
    compact?: boolean;

    refreshDetails?: () => Promise<void>;
}


@fusionElement('fusion-person-photo')
export class PersonPhotoElement extends FusionPersonElement implements PersonPhotoElementProps {

    static styles = styles;

    @property({ reflect: true })
    size?: PhotoSize;

    @property({ type: Boolean, reflect: true })
    compact?: boolean;

    get containerClass() {
        return {
            ...super.containerClass,
            [this.accountType]: true
        };
    }

    get accountType(): PersonAccountType {
        return this.details?.accountType;
    }

    get imageUrl(): string {
        return this.fusionResources.people.getPersonPhoto(this.person);
    }

    public renderContainer() {
        const photo = guard(this.person, () => until(
            this.renderImage(),
            html`<span class="skeleton"></span>`
        ));
        return html`${photo}<div id="presens"></div>`;
    }

    protected async renderImage() {
        try {
            const thumbnail = await createThumbnail(this.imageUrl, 'div');
            thumbnail.id = "thumbnail";
            return thumbnail;
        } catch (err) {
            return fallbackIcon;
        }
    }
}