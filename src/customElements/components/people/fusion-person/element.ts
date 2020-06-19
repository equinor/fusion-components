import { FusionElement, property, PropertyValues } from '../../base';
import { PersonDetails } from '@equinor/fusion';

/**
 * either person (azure id) or detail must be set!
 */
export interface FusionPersonElementProps {
    refreshDetails?: (force?: boolean) => Promise<void>;
    person?: string;
    details?: PersonDetails | string;
}

export abstract class FusionPersonElement extends FusionElement implements FusionPersonElementProps {

    @property()
    public person?: string;

    @property({ type: Object, reflect: false })
    details?: PersonDetails;

    public async refreshDetails(force?: boolean): Promise<void> {
        if (force || this.person !== this.details?.azureUniqueId) {
            await this.updateDetails();
        }
    }

    /**
    * @TODO handle error on fetch
    */
    protected async updateDetails(): Promise<void> {
        const { data } = await this.fusionContext.http.apiClients.people.getPersonDetailsAsync(this.person);
        this.details = data as PersonDetails;
    }

    /**
     * @override
     */
    protected async updated(changedProperties: PropertyValues) {
        super.update(changedProperties);
        changedProperties.has('person') && this.refreshDetails();
        if (changedProperties.has('details')) {
            this.person = this.details?.azureUniqueId;
        }
    }

}

export default FusionPersonElement;