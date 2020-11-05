import styles from './styles.less';
import {
    Pagination as PaginationConfig,
    Page,
    useComponentDisplayClassNames,
} from '@equinor/fusion';
import classNames from 'classnames';
import {
    Button,
    IconButton,
    SkeletonButton,
    SkeletonBar,
    styling,
    PaginationArrow,
} from '@equinor/fusion-components';

export type PaginationChangeHandler = (newPage: Page, perPage: number) => void;

type SkeletonPaginationProps = {
    pagination: PaginationConfig;
};

type PaginationProps = {
    pagination: PaginationConfig;
    onChange: PaginationChangeHandler;
};

type PaginationButtonProps = {
    page: Page;
    isCurrent: boolean;
    onClick: () => void;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({ page, isCurrent, onClick }) => (
    <Button frameless={!isCurrent} onClick={onClick}>
        {page.value}
    </Button>
);

const Padding: React.FC = () => <span className={styles.padding}>...</span>;

const Pagination: React.FC<PaginationProps> = ({ pagination, onChange }) => {
    const { currentPage, head, center, tail } = pagination;
    const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));

    return (
        <div className={containerClassNames}>
            <div className={styles.range}>
                {pagination.range.from} - {pagination.range.to} of {pagination.totalCount}
            </div>
            <div className={styles.buttons}>
                <IconButton
                    disabled={!pagination.prevPage}
                    onClick={() =>
                        pagination.prevPage && onChange(pagination.prevPage, pagination.perPage)
                    }
                >
                    <PaginationArrow prev />
                </IconButton>
                {head.length > 0 && (
                    <>
                        {pagination.head.map((page) => (
                            <PaginationButton
                                key={page.value}
                                page={page}
                                isCurrent={currentPage.index === page.index}
                                onClick={() => onChange(page, pagination.perPage)}
                            />
                        ))}
                        <Padding />
                    </>
                )}

                {center.map((page) => (
                    <PaginationButton
                        key={page.value}
                        page={page}
                        isCurrent={currentPage.index === page.index}
                        onClick={() => onChange(page, pagination.perPage)}
                    />
                ))}

                {tail.length > 0 && (
                    <>
                        <Padding />
                        {pagination.tail.map((page) => (
                            <PaginationButton
                                key={page.value}
                                page={page}
                                isCurrent={currentPage.index === page.index}
                                onClick={() => onChange(page, pagination.perPage)}
                            />
                        ))}
                    </>
                )}
                <IconButton
                    disabled={!pagination.nextPage}
                    onClick={() =>
                        pagination.nextPage && onChange(pagination.nextPage, pagination.perPage)
                    }
                >
                    <PaginationArrow next />
                </IconButton>
            </div>
        </div>
    );
};

export const PaginationSkeleton: React.FC<SkeletonPaginationProps> = ({ pagination }) => {
    const containerClassNames = classNames(styles.container, useComponentDisplayClassNames(styles));
    return (
        <div className={containerClassNames}>
            <div className={styles.range}>
                <SkeletonBar width={100} />
            </div>
            <div className={styles.buttons}>
                <SkeletonButton width={styling.grid(1)} frameless />
                <SkeletonButton width={styling.grid(1)} frameless />
                <SkeletonButton width={styling.grid(1)} frameless />
                <Padding />
                <SkeletonButton width={styling.grid(1)} frameless />
            </div>
        </div>
    );
};

export default Pagination;
