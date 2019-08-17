import * as Vue from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Prop, Provide, Inject } from 'vue-property-decorator';
import Cover from './Cover';
import Icon from './Icon';
import Main from './Main';
import Controller, { ControllerEvents } from './Controller';
import Button from './Button';

export interface Notice {
  text: string;
  time: number;
  opacity: number;
}

export interface PlayerProps {
  notice?: Notice;
  fixed?: boolean;
}

@Component
export default class Player extends Vue.Component<
PlayerProps,
ControllerEvents
> {
  @Prop({ type: Object, required: true })
  private readonly notice!: Notice;

  @Prop({ type: Boolean, required: false, default: false })
  private readonly fixed!: Boolean;

  @Inject()
  private readonly aplayer!: { media: APlayer.Media };

  private isPlayAction: Boolean = true

  private get playIcon(): string {
    return this.aplayer.media.paused ? 'play' : 'pause';
  }

  private get action(): string {
    return this.isPlayAction ? 'aplayer-body-action' : '';
  }

  private get isPlayShow(): string {
    return this.fixed ? this.action : ''
  }

  @Provide()
  private handleTogglePlay() {
    this.$emit('togglePlay');
  }

  @Provide()
  private handleSkipBack() {
    this.$emit('skipBack');
  }

  @Provide()
  private handleSkipForward() {
    this.$emit('skipForward');
  }

  @Provide()
  private handleToggleOrderMode() {
    this.$emit('toggleOrderMode');
  }

  @Provide()
  private handleToggleLoopMode() {
    this.$emit('toggleLoopMode');
  }

  @Provide()
  private handleTogglePlaylist() {
    this.$emit('togglePlaylist');
  }

  @Provide()
  private handleToggleLyric() {
    this.$emit('toggleLyric');
  }

  @Provide()
  private handleChangeVolume(volume: number) {
    this.$emit('changeVolume', volume);
  }

  @Provide()
  private handleChangeProgress(e: MouseEvent | TouchEvent, percent: number) {
    this.$emit('changeProgress', e, percent);
  }

  private handleMiniSwitcher() {
    this.isPlayAction = !this.isPlayAction
    this.$emit('miniSwitcher');
  }

  render() {
    const { playIcon, notice } = this;

    return (
      <div class={`aplayer-body ${this.isPlayShow}`}>
        <Cover onClick={this.handleTogglePlay}>
          <div class={`aplayer-button aplayer-${playIcon}`}>
            <Icon type={playIcon} />
          </div>
        </Cover>
        <Main>
          <Controller
            onSkipBack={this.handleSkipBack}
            onSkipForward={this.handleSkipForward}
            onTogglePlay={this.handleTogglePlay}
            onToggleOrderMode={this.handleToggleOrderMode}
            onToggleLoopMode={this.handleToggleLoopMode}
            onTogglePlaylist={this.handleTogglePlaylist}
            onToggleLyric={this.handleToggleLyric}
            onChangeVolume={this.handleChangeVolume}
            onChangeProgress={this.handleChangeProgress}
          />
        </Main>
        <div class="aplayer-notice" style={{ opacity: notice.opacity }}>
          {notice.text}
        </div>
        <div class="aplayer-miniswitcher" onClick={this.handleMiniSwitcher}>
          <Button type="miniswitcher" icon="right" />
        </div>
      </div>
    );
  }
}
