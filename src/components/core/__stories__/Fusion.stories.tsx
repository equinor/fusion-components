import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FusionHeader from '../Header';
import FusionContent from '../Content';
import { IconButton, Button } from '@equinor/fusion-components';
import { useFusionContext, useNotificationCenter } from '@equinor/fusion';

const snackbar = action('snackbar');
const banner = action('banner');
const dialog = action('dialog');

const AppSelectorIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 8H8V4H4V8ZM10 20H14V16H10V20ZM8 20H4V16H8V20ZM4 14H8V10H4V14ZM14 14H10V10H14V14ZM16 4V8H20V4H16ZM14 8H10V4H14V8ZM16 14H20V10H16V14ZM20 20H16V16H20V20Z"
                fill="currentColor"
            />
        </svg>
    );
};

let snackbarCount = 1;
let bannerCount = 1;

const FusionStory = () => {
    const { app } = useFusionContext();
    const sendNotificationAsync = useNotificationCenter();

    useEffect(() => {
        app.container.updateManifest('storybook', {
            AppComponent: FusionContent,
            key: 'storybook',
            name: 'storybook',
            shortName: 'storybook',
            description: '',
            version: '1.0.0',
            tags: [],
        });

        app.container.setCurrentAppAsync('storybook');
    }, []);

    const onSnackbarClick = async () => {
        const response = await sendNotificationAsync({
            level: 'low',
            title: 'This is is low priority notification #' + snackbarCount++,
            cancelLabel: 'Undo',
        });

        snackbar(response);
    };

    const onBannerClick = async () => {
        const response = await sendNotificationAsync({
            level: 'medium',
            title: 'What a nice banner! And this is medium priority notification #' + bannerCount++,
            confirmLabel: 'Sure is',
        });

        banner(response);
    };

    const onDialogClick = async () => {
        const response = await sendNotificationAsync({
            level: 'high',
            title: 'Are you sure you want a blocking notification?',
            body:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in fringilla magna, nec posuere justo.',
            cancelLabel: 'Cancel',
            confirmLabel: "I'm sure",
        });

        dialog(response);
    };

    return (
        <React.Fragment>
            <FusionHeader
                start={
                    <IconButton>
                        <AppSelectorIcon />
                    </IconButton>
                }
                content={null}
                aside={null}
                quickFactScope={'storybook'}
            />
            <FusionContent>
                <div style={{ maxWidth: 800, margin: '20px auto' }}>
                    <p>
                        <Button onClick={onSnackbarClick}>Show low priority notification</Button>
                        <Button onClick={onBannerClick}>Show medium priority notification</Button>
                        <Button onClick={onDialogClick}>
                            Show high priority blocking notification
                        </Button>
                    </p>
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
                        Nulla scelerisque egestas massa eget posuere. Vestibulum ante ipsum primis
                        in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris nisl
                        velit, lobortis non purus in, maximus sagittis nibh. Cras magna nisi, porta
                        at urna quis, condimentum euismod justo. Phasellus interdum libero sed
                        ligula malesuada, nec mattis lacus molestie. Aenean consequat sagittis
                        lectus, non ultricies lacus aliquet et. Fusce consequat orci vitae purus
                        malesuada, vitae euismod leo sodales. Curabitur et viverra sem.
                    </p>
                    <p>
                        Donec faucibus lacinia dui et lobortis. Nam ut gravida lorem, sed
                        sollicitudin nisl. In gravida massa eu placerat dignissim. Vivamus fringilla
                        eu quam quis dignissim. Nullam dapibus lobortis massa nec tristique.
                        Pellentesque non ullamcorper tellus. Duis congue dignissim cursus. Cras a
                        eros vel est facilisis vulputate non ut odio.
                    </p>
                    <p>
                        Quisque tincidunt ligula vitae urna porttitor, eget dignissim enim cursus.
                        Mauris fermentum ligula non felis tempus ultricies. Integer purus augue,
                        pellentesque ut lacus sed, sollicitudin pharetra diam. Mauris consectetur
                        dui eu convallis mollis. Ut nec dictum dui. Quisque interdum mollis
                        volutpat. Aenean vehicula, mi vitae tincidunt lobortis, dolor mi condimentum
                        metus, eu efficitur arcu mauris ut tortor. Nullam sapien sem, aliquet eget
                        rhoncus sit amet, hendrerit ut felis. In hac habitasse platea dictumst.
                    </p>
                    <p>
                        Maecenas hendrerit fermentum nisl sed feugiat. Donec ipsum urna, facilisis
                        vel egestas et, finibus nec massa. Duis posuere est ac ex luctus, a sagittis
                        sapien aliquet. Suspendisse nec mauris at nibh convallis ullamcorper. Etiam
                        cursus imperdiet porttitor. Donec odio ante, tempus at tempus ut, imperdiet
                        vitae turpis. Sed consequat, augue non ornare maximus, justo ante tempus
                        leo, vitae suscipit dolor purus ac odio. Nunc vitae augue ac lectus pretium
                        dapibus. Nulla a mi porta tortor tempus mattis. Phasellus luctus turpis eu
                        ante vestibulum, at pellentesque nisl dictum. Sed et velit eros. Cras et
                        lacus ut ex semper convallis. Nullam eleifend dolor eu leo vestibulum, in
                        vulputate nibh finibus. Phasellus sagittis elementum dignissim. Duis a
                        maximus mi. Nunc vel consectetur neque, nec tempus justo.
                    </p>
                    <p>
                        Donec sit amet mattis neque. Etiam quis sodales ex. Nullam molestie volutpat
                        tortor, vel hendrerit purus condimentum nec. Sed pellentesque pellentesque
                        quam. Donec vitae enim in ante facilisis vestibulum. Fusce congue ligula
                        nisl, et rhoncus ligula dignissim eu. Mauris feugiat laoreet lorem nec
                        blandit. Vivamus commodo tincidunt condimentum. Aliquam at enim in neque
                        sollicitudin tristique. Vestibulum vel lobortis sem. Nulla sagittis
                        pellentesque tincidunt.
                    </p>
                    <p>
                        Proin eu lectus eget est fermentum dignissim. Vestibulum at arcu sed nisl
                        porta rhoncus. Aliquam erat volutpat. Quisque tristique eros volutpat enim
                        pellentesque ultricies. Aenean congue est vel placerat suscipit. Vestibulum
                        non nisi id lectus mollis ullamcorper eu at nunc. Praesent nec tristique
                        diam, nec convallis enim. Ut sit amet auctor tortor. In vitae sem ac justo
                        euismod pretium semper sit amet lectus. Morbi ultricies porttitor dolor.
                        Aenean non aliquet leo, vitae tempor lectus.
                    </p>
                    <p>
                        Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Cras iaculis dolor vel augue placerat, sit amet hendrerit ante
                        pretium. Mauris quis ullamcorper sem. Nam mattis auctor risus, quis
                        pellentesque arcu ultricies vel. Mauris id tincidunt libero, nec blandit
                        augue. In quis tristique elit, ut convallis libero. Mauris sed condimentum
                        neque. In hac habitasse platea dictumst. Donec eget augue in urna suscipit
                        elementum. Donec pulvinar ullamcorper ullamcorper. Proin eu nisi at dolor
                        vehicula luctus vitae ut urna. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit.
                    </p>
                    <p>
                        Integer sit amet nisi id tellus vehicula tristique ac vitae magna. In luctus
                        volutpat est, quis aliquet ligula interdum ut. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Cras nec sagittis nisl, sit amet rutrum elit.
                        Pellentesque ac volutpat dolor. Nulla facilisi. Nulla pretium viverra lorem
                        non lacinia. Integer ultricies scelerisque lectus, commodo aliquam mi
                        egestas vitae. Aenean eu felis condimentum, condimentum ligula in, venenatis
                        ante. Vivamus ultricies efficitur ligula, sed blandit dui. Nam quam ligula,
                        feugiat id fringilla eget, lobortis sed ex.
                    </p>
                    <p>
                        Aenean finibus tellus nec hendrerit tincidunt. Duis fringilla magna in
                        efficitur imperdiet. Sed malesuada et tortor in pulvinar. Vivamus turpis
                        mauris, faucibus id urna eu, dapibus sollicitudin velit. Phasellus vehicula
                        enim non nibh mollis viverra. Nullam euismod rutrum vehicula. Fusce id nisi
                        nisi. Duis posuere nibh non neque dignissim luctus. Proin laoreet lacinia
                        metus in feugiat. Vivamus mollis metus a felis euismod vulputate.
                    </p>
                    <p>
                        Aliquam consectetur congue metus et pretium. Cras turpis libero,
                        pellentesque eget viverra vitae, sollicitudin vitae elit. Integer ac diam et
                        ligula luctus volutpat eget id dui. Donec tincidunt ipsum id dolor porttitor
                        consectetur. Proin ligula libero, porta eget mauris malesuada, dapibus
                        venenatis orci. Nullam sit amet tincidunt velit, eu aliquet turpis.
                        Curabitur vestibulum pretium nisi, vitae tristique nisi. Donec luctus est
                        lorem, vitae mattis massa sollicitudin a. Praesent ut nisl nec sapien
                        laoreet interdum et sit amet ipsum.
                    </p>
                    <p>
                        Integer condimentum tortor vel lorem faucibus gravida. Praesent metus ante,
                        volutpat vitae metus ac, viverra cursus justo. Nam quis lectus ligula.
                        Aenean ac nisi ac eros elementum fringilla. Nulla ultricies tincidunt libero
                        a maximus. Phasellus a semper massa, dapibus sollicitudin sem. Nam leo
                        lacus, suscipit ut dui ut, malesuada iaculis nulla. Sed venenatis felis non
                        condimentum gravida. Praesent eleifend mi in viverra accumsan. Aenean
                        sodales neque libero, in placerat nulla rhoncus vitae. Maecenas faucibus
                        dictum elit sed fringilla. Morbi eget fringilla nibh.
                    </p>
                    <p>
                        Mauris molestie nunc ante, ut imperdiet odio interdum id. In vitae velit at
                        mi finibus interdum. Suspendisse feugiat urna vel massa dignissim, ut
                        eleifend lorem facilisis. Sed suscipit pulvinar condimentum. Suspendisse
                        urna nisl, bibendum eget pretium a, vulputate quis mauris. In ut arcu arcu.
                        Sed imperdiet turpis non felis molestie porta.
                    </p>
                    <p>
                        Sed vehicula mauris eu massa maximus, sit amet ornare orci vulputate.
                        Suspendisse eu laoreet nulla. Phasellus odio ante, commodo sed sapien eget,
                        rhoncus consequat libero. Etiam dignissim aliquet dui at dapibus. Aenean a
                        imperdiet enim. Integer in dapibus lectus. Integer et tellus sit amet quam
                        elementum euismod et nec lectus. Aliquam varius lorem ex, et rhoncus sem
                        sollicitudin eu.
                    </p>
                    <p>
                        Mauris sed libero sit amet lorem tincidunt semper nec cursus velit.
                        Curabitur ut velit porta, posuere est et, semper diam. Ut varius consectetur
                        orci. Sed suscipit ex ipsum, id aliquet turpis consectetur vel. Sed laoreet
                        egestas libero vel posuere. Suspendisse hendrerit laoreet bibendum. Cras
                        ultricies erat velit, vitae accumsan ante consectetur vel. Aliquam cursus
                        odio eget varius accumsan. Quisque turpis massa, rutrum et maximus in,
                        pharetra at ex. Aenean lobortis leo ut cursus maximus.
                    </p>
                    <p>
                        Suspendisse sed orci eget dolor pretium posuere. Nulla rutrum molestie
                        dignissim. Suspendisse egestas quis velit in consequat. Nunc blandit, sapien
                        sed sagittis pulvinar, eros leo volutpat nibh, quis luctus purus ante
                        feugiat nisi. Cras non vulputate mi, scelerisque accumsan sapien. Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                        himenaeos. Cras egestas tempor velit. Nunc ut nisl id leo pretium efficitur
                        sed sed libero. Maecenas et orci quam. Fusce tellus libero, eleifend vitae
                        odio eu, pellentesque sagittis leo. Ut in neque enim.
                    </p>
                    <p>
                        Integer in lorem vitae quam eleifend tempus ac eu enim. Morbi condimentum
                        lectus nisl, et imperdiet justo finibus lacinia. Praesent interdum lacus
                        neque, nec consequat nulla congue sit amet. Sed tincidunt fermentum ante at
                        maximus. Cras a faucibus sem, pharetra laoreet nunc. Proin ornare libero a
                        massa tempor molestie. Nulla facilisi. Vestibulum ante ipsum primis in
                        faucibus orci luctus et ultrices posuere cubilia Curae;
                    </p>
                    <p>
                        Sed quis diam justo. Mauris condimentum, elit tempus porta euismod, leo est
                        consequat nunc, a mollis nunc arcu non purus. In eros est, convallis non
                        lacus eu, dictum faucibus diam. Suspendisse porttitor quis turpis sed
                        pretium. Suspendisse nec dolor a ante aliquet posuere. Maecenas placerat
                        magna diam, a gravida elit dictum a. Vestibulum vehicula ex ut felis luctus
                        tristique.
                    </p>
                </div>
            </FusionContent>
        </React.Fragment>
    );
};

storiesOf('Core|Fusion', module).add('Default', () => <FusionStory />);
