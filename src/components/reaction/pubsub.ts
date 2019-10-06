import Pubnub from 'pubnub';
import pubnubConfig from '../../../pubnub.config';

const MESSAGE_CHANNEL = 'MESSAGE_CHANNEL';

class PubSub {
  pubnub: Pubnub;

  constructor() {
    this.pubnub = new Pubnub(pubnubConfig);
    this.pubnub.subscribe({
      channels: [MESSAGE_CHANNEL],
    });
    this.addListener = this.addListener.bind(this);
    this.publish = this.publish.bind(this);
  }

  addListener(listenerConfig: any) {
    this.pubnub.addListener(listenerConfig);
  }

  publish(message: string) {
    this.pubnub.publish({
      message,
      channel: MESSAGE_CHANNEL,
    });
  }
}

export default PubSub;
