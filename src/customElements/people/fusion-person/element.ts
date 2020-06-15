import { FusionElement, html, property, customElement, PropertyValues } from '../../base';
import { PersonDetails } from '@equinor/fusion';

import '../fusion-person-photo';

export interface FusionPersonElementProps {
    person: string;
}

@customElement('fusion-person')
export class FusionPersonElement extends FusionElement implements FusionPersonElementProps {

    @property()
    public person: string;

    @property({ type: Object, reflect: false })
    data?: PersonDetails;

    render() {
        const { accountType } = this.data || {};
        console.log(this.person);
        return html`<fusion-person-photo person="${this.person}" type="${accountType}" />`;
    }

    protected async updated(changedProperties: PropertyValues) {
        changedProperties.has('person') && this.updateDetails();
    }

    protected async updateDetails(force?: boolean) {
        if (force || this.person !== this.data?.azureUniqueId) {
            const { data } = await this.fusionContext.http.apiClients.people.getPersonDetailsAsync(this.person);
            this.data = data;
        }
    }
}

export default FusionPersonElement;