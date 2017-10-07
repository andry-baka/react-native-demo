
/* ----------------------------------------------------
 INTRODUCTION
  Gauge Progress is s component is used to display circular progress bar with/without animation
 HOW TO USE
 Include the component, pass the specific props.
 * targetProgress: [0, maxProgress],
 * maxProgress: [0, 1]:
 *    1: the progress will be full circle,
 *    < 1: the progress will be a curve
 * progressPadding: the padding between background and progress bar
 * progressWidth: with of the bar
 * diameter: diameter or the Gauge
 * backgroundColor
 * color
 * clockwise: direction of the bar
 * rotate: degree of started point
 * lineCap: round or square
 * animateDuration: millisecond of running animation
 * animateStep: progress step per animation frame
 * autoStart: whether progress run on mount
 * onAnimateUpdate: handler for each frame
 * onAnimateCompleted: handler on animation completed

 Example:
 <GaugeProgressComponent
   targetProgress={targetProgress}
   maxProgress={maxProgress}
   rotate={135}
   progressWidth={progressWidth}
   diameter={width}
   backgroundColor={backgroundColor}
   color={color}
   progressPadding={progressPadding}
   clockwise
   autoStart={false}
  />
 ---------------------------------------------------- */

import React, { Component, PropTypes } from 'react';
import Svg, { Circle, G, LinearGradient, Defs, Stop } from 'svgs';

export default class GaugeProgress extends Component {
  constructor(props) {
    super(props);

    this._intervalId = 0;
    const { autoStart, targetProgress } = props;
    this.state = {
      currentProgress: autoStart ? 0 : Math.max(0, targetProgress)
    };
  }

  componentDidMount() {
    /**
     * auto run to the target progress with animation when autoStart = true
     */
    const { autoStart, targetProgress } = this.props;
    if (autoStart) {
      this._animate(targetProgress);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.targetProgress && newProps.targetProgress !== this.props.targetProgress) {
      this._animate(newProps.targetProgress, false);
    }
  }

  componentWillUnmount() {
    clearInterval(this._intervalId);
  }

  _isIncrease = true;

  _updateProgressByStep = (animateStep, targetProgress, onUpdate, onCompleted) => {
    const { currentProgress } = this.state;
    let nextProgress;
    if (this._isIncrease) {
      nextProgress = Math.min(currentProgress + animateStep, targetProgress);
    } else {
      nextProgress = Math.max(currentProgress - animateStep, targetProgress);
    }
    if (nextProgress === targetProgress) this._intervalId = clearInterval(this._intervalId);
    this.setState({ currentProgress: nextProgress }, () => {
      onUpdate(nextProgress);
      if (nextProgress === targetProgress) onCompleted();
    });
  };

  /**
   * animation to the target progress with animation
   * @param targetProgress: number
   * @param init: flag whether animate from 0 or from previous progrerss
   * @private
   */
  _animate = (_targetProgress, init = true) => {
    const targetProgress = Math.max(0, _targetProgress);
    if (targetProgress === 0) {
      this.setState({ currentProgress: 0 });
      return;
    }
    const {
      animateStep,
      animateDuration,
      onAnimateUpdate,
      onAnimateCompleted
    } = this.props;
    if (this._intervalId) this._intervalId = clearInterval(this._intervalId);
    if (animateDuration > 0 && animateStep > 0) {
      this._isIncrease = init || (targetProgress >= this.state.currentProgress);
      const diff = init ? targetProgress : Math.abs(targetProgress - this.state.currentProgress);
      if (init) this.setState({ currentProgress: 0 });
      const numberOfAnimates = Math.ceil(diff / animateStep);
      const intervalMilliseconds = Math.round(animateDuration / numberOfAnimates);
      this._intervalId = setInterval(() => {
        this._updateProgressByStep(animateStep, targetProgress, onAnimateUpdate, onAnimateCompleted);
      }, intervalMilliseconds);
    } else {
      this.setState({ currentProgress: targetProgress });
    }
  };

  render() {
    const {
      diameter,
      clockwise,
      maxProgress,
      progressPadding,
      progressWidth,
      backgroundColor,
      color,
      rotate,
      lineCap
    } = this.props;
    const { currentProgress } = this.state;

    const realProgress = currentProgress * maxProgress;
    const width = diameter + progressWidth;
    const progressDiameter = (diameter - progressPadding);
    const radius = progressDiameter / 2;

    const bgDashArray = Math.PI * progressDiameter;
    const maxProgressBasedOnDirection = clockwise ? (1 - maxProgress) : (1 + maxProgress);
    const bgDashOffset = bgDashArray * maxProgressBasedOnDirection;

    const progressDashArray = Math.PI * progressDiameter;
    const percentValue2BasedOnDirection = clockwise ? (1 - realProgress) : (1 + realProgress);
    const progressDashOffset = progressDashArray * percentValue2BasedOnDirection;
    const circleCenterPosition = width / 2;
    let transform = null;

    transform = {
      translate: `${circleCenterPosition},${circleCenterPosition}`, rotate: `${rotate}`
    };
    return (
      <Svg
        width={width}
        height={width}

      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0" stopColor="rgb(212, 241, 35)" stopOpacity="1" />
            <Stop offset="1" stopColor="rgb(55, 248, 162)" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <G
          transform={transform}
        >
          <Circle
            r={radius}
            fill={'none'}
            stroke={backgroundColor}
            strokeWidth={progressWidth}
            strokeLinecap={lineCap}
            strokeDasharray={[bgDashArray]}
            strokeDashoffset={bgDashOffset}
          />
          <Circle
            r={radius}
            fill={'none'}
            stroke={'url(#grad)'}
            strokeWidth={progressWidth - progressPadding}
            strokeLinecap={lineCap}
            strokeDasharray={[progressDashArray]}
            strokeDashoffset={progressDashOffset}
          />
        </G>
      </Svg>
    );
  }
}

GaugeProgress.propTypes = {
  targetProgress: PropTypes.number,
  maxProgress: PropTypes.number,
  progressPadding: PropTypes.number,
  progressWidth: PropTypes.number,
  diameter: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  clockwise: PropTypes.bool,
  rotate: PropTypes.number,
  lineCap: PropTypes.oneOf(['round', 'square']),
  animateDuration: PropTypes.number,
  animateStep: PropTypes.number,
  autoStart: PropTypes.bool,
  onAnimateUpdate: PropTypes.func,
  onAnimateCompleted: PropTypes.func
};

GaugeProgress.defaultProps = {
  targetProgress: 0,
  maxProgress: 1,
  progressPadding: 4,
  progressWidth: 16,
  diameter: 200,
  backgroundColor: '#FFF',
  color: '#70AB77',
  clockwise: true,
  rotate: 90,
  lineCap: 'round',
  animateDuration: 0,
  animateStep: 0.005,
  autoStart: false,
  onAnimateUpdate: () => {},
  onAnimateCompleted: () => {}
};

