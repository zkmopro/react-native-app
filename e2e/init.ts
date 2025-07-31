import { DetoxCircusEnvironment } from 'detox/runners/jest';

class CustomDetoxEnvironment extends DetoxCircusEnvironment {
  constructor(config: any, context: any) {
    super(config, context);
  }
}

export default CustomDetoxEnvironment; 