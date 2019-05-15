import React from "react";
import PropTypes from "prop-types";
import Button from "../../Button";
import styles from "./styles.less";

const firstChapterText = `Super mario landed gentry 
    erudite headmaster circus strongman, circus strongma
    n elit super mario got milk magnum pi dolor ipsum casual style
    landed gentry erudite headmaster barber shop quartet barber shop quartet, super mario groucho marx what a bounder magnum pi
    lemmy elit landed gentry lando calrissian got milk barber shop quartet circus strongman barber shop quartet mexican’t dolor ipsum casual 
    style erudite headmaster? Great dictator Daniel plainview theodore roosevelt ian botham clone zone shopper theodore roosevelt, pit fighter barber 
    shop quartet hello, we’re cockneys ian botham Daniel plainview che gu
    evara gent theodore roosevelt erudite headmaster great dictator clone zone shopper theodore roosevelt?`;

const secondChapterText = `Mouth coiffure brigadier great dictator. Sweat irrigator, dolor sit amet groucho-a-like grooming, sweat irrigator, 
    el snort basil fawlty Refined gentlemen rugged dolor sit amet groucho-a-like grooming frontiersman charlie chaplin graeme souness waiter?
    Consectetur erudite headmaster wario lando calrissian groucho marx. Will you do the fandango crumb catcher middle eastern despot louis xiii what a bounder?`;

const thirdChapterText = `Consectetur erudite headmaster wario lando calrissian groucho marx. Will you do the fandango 
    crumb catcher middle eastern despot louis xiii what a bounder?`;

export const FirstChapter = props => {
    return (
        <div className={styles.content}>
            <Button primary comfortable onClick={() => props.changeChapter("chapter2")}>
                Next Chapter
            </Button>
            <div className={styles.chapter}>{firstChapterText}</div>
        </div>
    );
};

export const SecondChapter = props => {
    return (
        <div className={styles.content}>
            <Button primary comfortable onClick={() => props.changeChapter("chapter1")}>
                Previous Chapter
            </Button>
            <Button primary comfortable onClick={() => props.changeChapter("chapter3")}>
                Next Chapter
            </Button>
            <div className={styles.chapter}>{secondChapterText}</div>
        </div>
    );
};

export const ThirdChapter = props => {
    return (
        <div className={styles.content}>
            <Button primary comfortable onClick={() => props.changeChapter("chapter2")}>
                Previous Chapter
            </Button>
            <div className={styles.chapter}>{thirdChapterText}</div>
        </div>
    );
};
FirstChapter.propTypes = {
    changeChapter: PropTypes.func.isRequired,
};

SecondChapter.propTypes = {
    changeChapter: PropTypes.func.isRequired,
};

ThirdChapter.propTypes = {
    changeChapter: PropTypes.func.isRequired,
};
