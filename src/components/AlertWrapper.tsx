'use client';
import { useAlertContext } from '@/stores';
import { Notification } from '@/components';

const AlertWrapper = () => {
  const { showAlert, cancelAlert, alertInfo } = useAlertContext();

  return (
    <Notification
      show={showAlert}
      onCancel={cancelAlert}
      error={alertInfo.isError}
      text={alertInfo.message}
    />
  );
};

export default AlertWrapper;
