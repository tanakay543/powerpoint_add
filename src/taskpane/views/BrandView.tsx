import React, { useEffect, useState } from 'react';
import {
  Input,
  Field,
  Button,
  Text,
  makeStyles,
  tokens,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-components';
import { CheckmarkCircle24Regular, DismissCircle24Regular } from '@fluentui/react-icons';
import { loadBrand, saveBrand } from '../../brand';
import { useBrandStore } from '../../store';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalXXL,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  colorRow: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'flex-start',
  },
  colorField: {
    flex: 1,
  },
  colorInputGroup: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    alignItems: 'flex-end',
  },
  colorPicker: {
    width: '60px',
    height: '32px',
    border: 'none',
    borderRadius: tokens.borderRadiusMedium,
    cursor: 'pointer',
  },
  preview: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    flexWrap: 'wrap',
  },
  colorPreview: {
    flex: 1,
    minWidth: '120px',
  },
  colorBox: {
    width: '100%',
    height: '80px',
    borderRadius: tokens.borderRadiusMedium,
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: tokens.spacingVerticalXXS,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForegroundInverted,
    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
  },
  fontRow: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
    alignItems: 'flex-end',
  },
  fontPreview: {
    padding: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  actions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalS,
    flexWrap: 'wrap',
  },
  validationIcon: {
    marginLeft: tokens.spacingHorizontalXS,
  },
});

/**
 * HEX形式のバリデーション
 */
function isValidHex(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

export const BrandView: React.FC = () => {
  const styles = useStyles();
  const { config, setConfig, resetConfig, updateConfig } = useBrandStore();
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 初回ロード時にストレージから設定を読み込む
  useEffect(() => {
    loadBrand()
      .then((loadedConfig) => setConfig(loadedConfig))
      .catch((err) => {
        console.error('Failed to load brand config:', err);
        setError('ブランド設定の読み込みに失敗しました');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // setConfig は Zustand から返されるので安定している

  const handleSave = async () => {
    try {
      setError(null);
      await saveBrand(config);
      setSavedAt(new Date().toLocaleTimeString('ja-JP'));
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存に失敗しました');
    }
  };

  const handleReset = () => {
    resetConfig();
    setSavedAt(null);
    setError(null);
  };

  const isPrimaryValid = isValidHex(config.primary);
  const isSecondaryValid = isValidHex(config.secondary);
  const canSave = isPrimaryValid && isSecondaryValid;

  return (
    <div className={styles.root}>
      <Text weight="semibold" size={500}>ブランド設定</Text>

      {error && (
        <MessageBar intent="error">
          <MessageBarBody>
            <MessageBarTitle>エラー</MessageBarTitle>
            {error}
          </MessageBarBody>
        </MessageBar>
      )}

      {savedAt && !error && (
        <MessageBar intent="success">
          <MessageBarBody>
            保存しました: {savedAt}
          </MessageBarBody>
        </MessageBar>
      )}

      {/* カラー設定 */}
      <div className={styles.section}>
        <Text weight="semibold">カラー設定</Text>

        <div className={styles.colorRow}>
          <div className={styles.colorField}>
            <Field
              label="Primary Color"
              validationMessage={
                !isPrimaryValid ? 'HEX形式で入力してください (#RRGGBB)' : undefined
              }
              validationState={!isPrimaryValid ? 'error' : 'success'}
            >
              <div className={styles.colorInputGroup}>
                <input
                  type="color"
                  value={config.primary}
                  onChange={(e) => updateConfig({ primary: e.target.value })}
                  className={styles.colorPicker}
                />
                <Input
                  value={config.primary}
                  onChange={(_, d) => updateConfig({ primary: d.value.toUpperCase() })}
                  placeholder="#0078D4"
                  contentAfter={
                    isPrimaryValid ? (
                      <CheckmarkCircle24Regular className={styles.validationIcon} color="green" />
                    ) : (
                      <DismissCircle24Regular className={styles.validationIcon} color="red" />
                    )
                  }
                />
              </div>
            </Field>
          </div>

          <div className={styles.colorField}>
            <Field
              label="Secondary Color"
              validationMessage={
                !isSecondaryValid ? 'HEX形式で入力してください (#RRGGBB)' : undefined
              }
              validationState={!isSecondaryValid ? 'error' : 'success'}
            >
              <div className={styles.colorInputGroup}>
                <input
                  type="color"
                  value={config.secondary}
                  onChange={(e) => updateConfig({ secondary: e.target.value })}
                  className={styles.colorPicker}
                />
                <Input
                  value={config.secondary}
                  onChange={(_, d) => updateConfig({ secondary: d.value.toUpperCase() })}
                  placeholder="#50E6FF"
                  contentAfter={
                    isSecondaryValid ? (
                      <CheckmarkCircle24Regular className={styles.validationIcon} color="green" />
                    ) : (
                      <DismissCircle24Regular className={styles.validationIcon} color="red" />
                    )
                  }
                />
              </div>
            </Field>
          </div>
        </div>

        {/* カラープレビュー */}
        <Text size={200} weight="semibold">プレビュー</Text>
        <div className={styles.preview}>
          <div className={styles.colorPreview}>
            <Text size={200}>Primary</Text>
            <div
              className={styles.colorBox}
              style={{ backgroundColor: isPrimaryValid ? config.primary : '#ccc' }}
            >
              {config.primary}
            </div>
          </div>
          <div className={styles.colorPreview}>
            <Text size={200}>Secondary</Text>
            <div
              className={styles.colorBox}
              style={{ backgroundColor: isSecondaryValid ? config.secondary : '#ccc' }}
            >
              {config.secondary}
            </div>
          </div>
        </div>
      </div>

      {/* フォント設定 */}
      <div className={styles.section}>
        <Text weight="semibold">フォント設定</Text>

        <div className={styles.fontRow}>
          <Field label="和文フォント" style={{ flex: 1 }}>
            <Input
              value={config.fontJa}
              onChange={(_, d) => updateConfig({ fontJa: d.value })}
              placeholder="Yu Gothic"
            />
          </Field>
          <Field label="英文フォント" style={{ flex: 1 }}>
            <Input
              value={config.fontEn}
              onChange={(_, d) => updateConfig({ fontEn: d.value })}
              placeholder="Segoe UI"
            />
          </Field>
        </div>

        {/* フォントプレビュー */}
        <Text size={200} weight="semibold">プレビュー</Text>
        <div className={styles.fontPreview}>
          <Text style={{ fontFamily: config.fontJa, fontSize: '16px' }}>
            日本語サンプル：あいうえお
          </Text>
          <Text style={{ fontFamily: config.fontEn, fontSize: '16px' }}>
            English Sample: ABCDEFG
          </Text>
        </div>
      </div>

      {/* アクション */}
      <div className={styles.actions}>
        <Button
          appearance="primary"
          onClick={handleSave}
          disabled={!canSave}
        >
          保存
        </Button>
        <Button appearance="subtle" onClick={handleReset}>
          デフォルトに戻す
        </Button>
      </div>

      <Text size={100} style={{ opacity: 0.6, marginTop: tokens.spacingVerticalS }}>
        ※ 設定はアドイン終了後も保持されます
      </Text>
    </div>
  );
};
