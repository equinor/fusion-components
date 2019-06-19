import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Banner from './index';
import { WarningIcon } from '../../icons/components/alert';
import FusionHeader from '../../core/Header';
import FusionContent from '../../core/Content';
import SnackBar from '../Snackbar';
const BannerStory = () => {
    const abort = new AbortController();
    const [open, setOpen] = React.useState(true);
    const [openSnack, setOpenSnack] = React.useState(false);
    const openBanner = () => {
        setTimeout(() => {
            setOpen(true);
        }, 5000);
    };
    return (
        <React.Fragment>
            <FusionHeader />
            <FusionContent>
                {openSnack ? (
                    <SnackBar
                        message="Document Saved!"
                        abortSignal={abort.signal}
                        onCancel={() => {
                            setOpenSnack(false);
                            openBanner();
                        }}
                        cancellable
                        cancelLabel="Close"
                    />
                ) : null}
                {open ? (
                    <div style={{ position: 'sticky', top: '82px'}}>
                        <Banner
                            message="Hey! You forgot to save your document! "
                            cancelLabel="Dismiss"
                            onCancel={() => {
                                setOpen(false);
                                openBanner();
                            }}
                            action
                            actionLabel="Save document"
                            onAction={() => {
                                setOpen(false);
                                setOpenSnack(true);
                            }}
                            icon={<WarningIcon outline cursor="default" height={36} width={36} />}
                        />
                    </div>
                ) : null}
                <div style={{ maxWidth: 800, margin: '20px auto' }}>
                    <h2>Scrolling appears a bit weird in Storybook</h2>
                    <h3>The header disappears when scrolling past ~50%</h3>
                    <h4>But works like a charm when placed directly within body with margin: 0;</h4>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in fringilla
                        magna, nec posuere justo. Nullam tempus lectus lorem, at venenatis magna
                        rhoncus ut. Nullam finibus aliquet ultricies. Suspendisse dictum tellus at
                        augue posuere, at consequat arcu varius. Aliquam finibus, odio non molestie
                        finibus, nibh sapien accumsan erat, vitae congue nulla nisi nec diam. Nulla
                        viverra libero vitae dui cursus, vitae cursus risus commodo. Donec pharetra
                        mollis ipsum, non placerat massa ultrices at. Mauris sit amet elit eu sem
                        vulputate egestas ac et quam.
                    </p>
                    <p>
                        Nulla ac lorem nulla. Mauris iaculis dui est, id pretium diam elementum
                        vitae. Aenean consequat, ligula ac interdum mollis, justo erat rhoncus
                        turpis, a ullamcorper orci ex ut libero. Phasellus porta interdum
                        condimentum. Maecenas justo quam, euismod non fermentum id, rutrum ut diam.
                        Sed dui est, porta quis consequat ac, rutrum non nibh. Nullam non est a nisi
                        iaculis varius. Vivamus eleifend, velit eget malesuada eleifend, velit eros
                        dictum est, et hendrerit orci lectus sit amet eros.
                    </p>
                    <p>
                        Etiam congue nibh non lacus rhoncus, vitae feugiat mi egestas. Quisque
                        fringilla ultrices tortor, sed interdum tellus porta vel. Morbi posuere
                        metus non lacus tempus porttitor. Donec ac luctus elit. Mauris scelerisque
                        fringilla tincidunt. Nulla fringilla porta suscipit. Praesent pulvinar nulla
                        eget arcu aliquam, id dictum nunc tempor. Vivamus accumsan ante at convallis
                        mollis. Suspendisse facilisis ligula finibus, lobortis dolor scelerisque,
                        convallis nibh. Donec tempor augue sit amet imperdiet varius. Pellentesque
                        nec sodales purus. Nulla placerat elementum arcu, quis iaculis orci molestie
                        nec.
                    </p>
                    <p>
                        Nulla ac lorem nulla. Mauris iaculis dui est, id pretium diam elementum
                        vitae. Aenean consequat, ligula ac interdum mollis, justo erat rhoncus
                        turpis, a ullamcorper orci ex ut libero. Phasellus porta interdum
                        condimentum. Maecenas justo quam, euismod non fermentum id, rutrum ut diam.
                        Sed dui est, porta quis consequat ac, rutrum non nibh. Nullam non est a nisi
                        iaculis varius. Vivamus eleifend, velit eget malesuada eleifend, velit eros
                        dictum est, et hendrerit orci lectus sit amet eros.
                    </p>
                    <p>
                        Etiam congue nibh non lacus rhoncus, vitae feugiat mi egestas. Quisque
                        fringilla ultrices tortor, sed interdum tellus porta vel. Morbi posuere
                        metus non lacus tempus porttitor. Donec ac luctus elit. Mauris scelerisque
                        fringilla tincidunt. Nulla fringilla porta suscipit. Praesent pulvinar nulla
                        eget arcu aliquam, id dictum nunc tempor. Vivamus accumsan ante at convallis
                        mollis. Suspendisse facilisis ligula finibus, lobortis dolor scelerisque,
                        convallis nibh. Donec tempor augue sit amet imperdiet varius. Pellentesque
                        nec sodales purus. Nulla placerat elementum arcu, quis iaculis orci molestie
                        nec.
                    </p>
                    <p>
                        Nulla scelerisque egestas massa eget posuere. Vestibulum ante ipsum primis
                        in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris nisl
                        velit, lobortis non purus in, maximus sagittis nibh. Cras magna nisi, porta
                        at urna quis, condimentum euismod justo. Phasellus interdum libero sed
                        ligula malesuada, nec mattis lacus molestie. Aenean consequat sagittis
                        lectus, non ultricies lacus aliquet et. Fusce consequat orci vitae purus
                        malesuada, vitae euismod leo sodales. Curabitur et viverra sem.
                    </p>
                    <p>
                        Nulla scelerisque egestas massa eget posuere. Vestibulum ante ipsum primis
                        in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris nisl
                        velit, lobortis non purus in, maximus sagittis nibh. Cras magna nisi, porta
                        at urna quis, condimentum euismod justo. Phasellus interdum libero sed
                        ligula malesuada, nec mattis lacus molestie. Aenean consequat sagittis
                        lectus, non ultricies lacus aliquet et. Fusce consequat orci vitae purus
                        malesuada, vitae euismod leo sodales. Curabitur et viverra sem.
                    </p>
                    <p>
                        Nulla scelerisque egestas massa eget posuere. Vestibulum ante ipsum primis
                        in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris nisl
                        velit, lobortis non purus in, maximus sagittis nibh. Cras magna nisi, porta
                        at urna quis, condimentum euismod justo. Phasellus interdum libero sed
                        ligula malesuada, nec mattis lacus molestie. Aenean consequat sagittis
                        lectus, non ultricies lacus aliquet et. Fusce consequat orci vitae purus
                        malesuada, vitae euismod leo sodales. Curabitur et viverra sem.
                    </p>
                </div>
            </FusionContent>
        </React.Fragment>
    );
};

storiesOf('Feedback|Banner', module).add('Default', () => <BannerStory />);
