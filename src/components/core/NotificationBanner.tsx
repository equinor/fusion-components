import { FC, useState, useCallback, useEffect, useMemo } from 'react';
import {
    NotificationRequest,
    NotificationResponse,
    RegisterNotificationPresenter,
} from '@equinor/fusion';
import { Banner } from '@equinor/fusion-components';

type BannerNotification = {
    request: NotificationRequest;
    resolve: (response: NotificationResponse) => void;
    abortSignal: AbortSignal;
};

type NotificationBannerProps = {
    registerPresenter: RegisterNotificationPresenter;
};

const NotificationBanner: FC<NotificationBannerProps> = ({ registerPresenter }) => {
    const [banners, setBanners] = useState<BannerNotification[]>([]);

    const resolveBanner = useCallback(
        (banner: BannerNotification, response: NotificationResponse) => {
            banner.resolve(response);
            setBanners((banners) => banners.filter((b) => b !== banner));
        },
        []
    );

    const onConfirm = useCallback((banner: BannerNotification) => {
        resolveBanner(banner, {
            confirmed: true,
            cancelled: false,
            dismissed: false,
        });
    }, []);

    const onDismiss = useCallback((banner: BannerNotification) => {
        resolveBanner(banner, {
            confirmed: false,
            cancelled: false,
            dismissed: true,
        });
    }, []);

    const presentBanner = (
        request: NotificationRequest,
        resolve: (response: NotificationResponse) => void,
        abortSignal: AbortSignal
    ) => {
        const banner = { request, resolve, abortSignal };
        setBanners((banners) => [banner, ...banners]);
    };

    useEffect(() => {
        return registerPresenter('medium', presentBanner);
    }, []);

    const currentBanner = useMemo(() => (banners.length ? banners[0] : null), [banners]);

    if (!currentBanner) {
        return null;
    }

    return (
        <Banner
            message={currentBanner.request.title}
            action={!!currentBanner.request.confirmLabel}
            actionLabel={currentBanner.request.confirmLabel}
            onAction={() => onConfirm(currentBanner)}
            onDismiss={() => onDismiss(currentBanner)}
        />
    );
};

export default NotificationBanner;
