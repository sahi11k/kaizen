import * as RadixSlider from "@radix-ui/react-slider";
import styles from "./style.module.css";

const Slider = ({
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
}) => {
  return (
    <RadixSlider.Root
      className={styles.root}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      onValueChange={onValueChange}
    >
      <RadixSlider.Track className={styles.track}>
        <RadixSlider.Range className={styles.range} />
      </RadixSlider.Track>
      <RadixSlider.Thumb className={styles.thumb} />
    </RadixSlider.Root>
  );
};

export default Slider;
