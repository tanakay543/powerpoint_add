import React from 'react';
import { Text, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS },
  placeholder: { color: tokens.colorNeutralForeground3 },
});

/** Phase 2 で実装予定のテンプレート一覧。 */
export const TemplateView: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Text weight="semibold">テンプレート</Text>
      <Text className={styles.placeholder} size={200}>
        Phase 2 でスライドテンプレート一覧を表示します。
      </Text>
    </div>
  );
};
