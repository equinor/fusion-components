import { clsx } from '@equinor/fusion-react-styles';
import { FC, useContext, useMemo } from 'react';
import { TimelineSplit } from '../../model';
import { timelineContext } from '../../TimelineProvider';
import { actions } from '../../TimelineProvider/actions';
import { useStyles } from './styles';

type SplitProps = {
	/**
	 * The unique id of a position split.
	 */
	id: string;
	/**
	 * The unique id representing a rotation group. Splits in the same rotation group has
	 * the same rotation id. This property is provided by backend.
	 */
	rotationId?: string;
	/**
	 * An object containing all relevant metadata about the split.
	 */
	split: TimelineSplit;
	/**
	 *  If split overlaps with dates from other splits.
	 */
	hasOverlap: boolean;
};

export const Split: FC<SplitProps> = ({ id, rotationId, split, hasOverlap }) => {
	const styles = useStyles({ isRotation: !!rotationId, hasOverlap });
	const {
		state: {
			position,
			selected,
			highlighted,
			disabled,
			mode,
			PersonSlot,
			InfoSlot,
			ActionSlot,
			computePosition,
		},
		dispatch,
	} = useContext(timelineContext);
	const isDisabled = disabled.includes(id);
	const isSelected = selected.includes(id);

	const handleClick = (e) => {
		if (isDisabled) {
			return;
		}
		e.stopPropagation();
		if (mode === 'slider') return;
		dispatch(actions.selectSplit(id));
	};
	if (!computePosition) return null;

	const thisLeftPos = computePosition(split.appliesFrom.getTime(), 'start');
	const thisRightPos = computePosition(split.appliesTo.getTime(), 'end');

	//  if mode is hightliht, only highlight array should be used
	const shouldHighlightSplit = useMemo(() => {
		if (mode === 'highlight')
			return highlighted.includes(id);
		else
			return [...selected, ...highlighted].includes(id);
	}, [id, mode, selected, highlighted]);


	return (
		<div
			className={clsx(styles.container, {
				[styles.highlighted]: shouldHighlightSplit,
				[styles.disabled]: isDisabled,
				[styles.clickable]: mode !== 'slider' && !isDisabled,
			})}
			style={{
				left: `${thisLeftPos}%`,
				right: `${thisRightPos}%`,
			}}
			onClick={handleClick}
		>
			<div className={styles.content}>
				<div className={clsx(styles.slot, styles.maxWidth)}>
					{PersonSlot && (
						<PersonSlot
							split={split}
							position={position}
							isSelected={isSelected}
							isDisabled={isDisabled}
						/>
					)}
				</div>
				<div style={{ justifyContent: 'flex-start' }} className={styles.slot}>
					{InfoSlot && (
						<InfoSlot
							split={split}
							position={position}
							isSelected={isSelected}
							isDisabled={isDisabled}
						/>
					)}
				</div>
				<div className={clsx(styles.slot, styles.maxWidth)}>
					{ActionSlot && (
						<ActionSlot
							split={split}
							position={position}
							isSelected={isSelected}
							isDisabled={isDisabled}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Split;
