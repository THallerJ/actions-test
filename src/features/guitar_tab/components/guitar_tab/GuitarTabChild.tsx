import Staff from '../notes/Staff';
import TabButtons from '../forms/TabButtons';
import { useTabContext } from '../../stores/useTabContext';
import Form from '../forms/Form';
import TabInfo from '../forms/TabInfo';
import styles from './guitar_tab.module.scss';
import { ConditionalHandler, Spinner, Message } from '@/components';

const GuitarTabChild = ({ isLoading, isError }: GuitarTabChildProps) => {
  const { readonly, hadIntitialTab, isNewTab } = useTabContext();

  return (
    <div className={styles.innerWrap}>
      <ConditionalHandler condition={!isLoading} fallback={<LoadingSpinner />}>
        <ConditionalHandler
          condition={!isError}
          fallback={<ShowMessage text="An error has occured" />}
        >
          <ConditionalHandler
            condition={isNewTab || hadIntitialTab}
            fallback={
              <ShowMessage text="You either do not have access to this page or the page does not exist" />
            }
          >
            {!readonly ? <Form /> : <TabInfo full />}
            <div className={styles.body}>
              <TabButtons />
              <Staff />
            </div>
          </ConditionalHandler>
        </ConditionalHandler>
      </ConditionalHandler>
    </div>
  );
};

export default GuitarTabChild;

const LoadingSpinner = () => {
  return (
    <div className={styles.conditionalWrapper}>
      <Spinner />
    </div>
  );
};

const ShowMessage = ({ text }: { text: string }) => {
  return (
    <div className={styles.conditionalWrapper}>
      <Message text={text} />
    </div>
  );
};

type GuitarTabChildProps = {
  isLoading: boolean;
  isError: boolean;
};
