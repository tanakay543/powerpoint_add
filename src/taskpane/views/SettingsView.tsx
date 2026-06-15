import React from 'react';
import { Text, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS },
  placeholder: { color: tokens.colorNeutralForeground3 },
});

/**
 * 設定ビュー。
 * Phase 1 で詳細な設定項目を実装予定。
 */
export const SettingsView: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Text weight="semibold">設定</Text>
      <Text className={styles.placeholder} size={200}>
        Phase 1 でアドイン設定、エクスポート/インポート機能を実装します。
      </Text>
    </div>
  );
};
