/**
 * ガントチャート設定ダイアログ
 *
 * ユーザーがガントチャートのパラメータを入力するダイアログ
 */

import { useState } from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Field,
  Dropdown,
  Option,
  Checkbox,
  Label,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  surface: {
    maxWidth: 'min(22rem, 90vw)',
    width: '100%',
    overflowX: 'hidden',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    overflowX: 'hidden',
  },
  dateField: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  dateInput: {
    width: '100%',
    boxSizing: 'border-box',
  },
  dateInputRow: {
    display: 'flex',
    gap: tokens.spacingHorizontalXS,
    alignItems: 'center',
  },
  compactDropdown: {
    minWidth: '0',
    flex: '1',
  },
  helpText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXXS,
  },
});

export interface GanttChartParams {
  pattern: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  startDate: string;
  endDate: string;
  includeMilestones: boolean;
}

interface GanttChartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (params: GanttChartParams) => void;
}

export const GanttChartDialog: React.FC<GanttChartDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  const styles = useStyles();

  // デフォルト値（今日から3ヶ月後まで）
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // 1-12

  // 会計年度四半期を計算（4-6月=Q1, 7-9月=Q2, 10-12月=Q3, 1-3月=Q4）
  const getFiscalQuarter = (month: number): number => {
    if (month >= 4 && month <= 6) return 1;
    if (month >= 7 && month <= 9) return 2;
    if (month >= 10 && month <= 12) return 3;
    return 4; // 1-3月
  };

  const getFiscalYear = (date: Date): number => {
    const month = date.getMonth() + 1;
    return month >= 4 ? date.getFullYear() : date.getFullYear() - 1;
  };

  const currentQuarter = getFiscalQuarter(currentMonth);
  const currentFiscalYear = getFiscalYear(today);

  // 3ヶ月後のデフォルト値
  const threeMonthsLater = new Date(today);
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  const endMonthDefault = threeMonthsLater.getMonth() + 1;
  const endYearDefault = threeMonthsLater.getFullYear();

  const [pattern, setPattern] = useState<GanttChartParams['pattern']>('monthly');
  const [startDate, setStartDate] = useState<string>(
    today.toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    threeMonthsLater.toISOString().split('T')[0]
  );
  const [includeMilestones, setIncludeMilestones] = useState<boolean>(false);

  // 四半期・月次用の個別状態
  const [startYear, setStartYear] = useState<number>(currentFiscalYear);
  const [startQuarter, setStartQuarter] = useState<number>(currentQuarter);
  const [startMonth, setStartMonth] = useState<number>(currentMonth);
  const [endYear, setEndYear] = useState<number>(endYearDefault);
  const [endQuarter, setEndQuarter] = useState<number>(
    getFiscalQuarter(endMonthDefault)
  );
  const [endMonth, setEndMonth] = useState<number>(endMonthDefault);


  const handleConfirm = () => {
    // パターンに応じて完全な日付形式（YYYY-MM-DD）に変換
    let finalStartDate = startDate;
    let finalEndDate = endDate;

    if (pattern === 'quarterly') {
      // 四半期を日付に変換（会計年度: Q1=4-6月, Q2=7-9月, Q3=10-12月, Q4=1-3月）
      const quarterToMonth = (year: number, quarter: number): { startYear: number; startMonth: number; endYear: number; endMonth: number } => {
        if (quarter === 1) {
          return { startYear: year, startMonth: 4, endYear: year, endMonth: 6 };
        } else if (quarter === 2) {
          return { startYear: year, startMonth: 7, endYear: year, endMonth: 9 };
        } else if (quarter === 3) {
          return { startYear: year, startMonth: 10, endYear: year, endMonth: 12 };
        } else {
          return { startYear: year + 1, startMonth: 1, endYear: year + 1, endMonth: 3 };
        }
      };

      const start = quarterToMonth(startYear, startQuarter);
      const end = quarterToMonth(endYear, endQuarter);

      finalStartDate = `${start.startYear}-${String(start.startMonth).padStart(2, '0')}-01`;

      // 四半期の最終日を計算
      const endMonthLastDay = new Date(end.endYear, end.endMonth, 0).getDate();
      finalEndDate = `${end.endYear}-${String(end.endMonth).padStart(2, '0')}-${String(endMonthLastDay).padStart(2, '0')}`;
    } else if (pattern === 'monthly') {
      // 月を日付に変換（月初と月末）
      finalStartDate = `${startYear}-${String(startMonth).padStart(2, '0')}-01`;

      // 月末日を計算
      const lastDay = new Date(endYear, endMonth, 0).getDate();
      finalEndDate = `${endYear}-${String(endMonth).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    } else if (pattern === 'weekly') {
      // 週次: "2026-W23" → "2026-06-02" (月曜日) 形式に変換
      const weekToDate = (weekStr: string): string => {
        if (!weekStr || !weekStr.includes('-W')) {
          throw new Error('週次フォーマットが不正です');
        }

        const [yearStr, weekStr2] = weekStr.split('-W');
        const year = parseInt(yearStr, 10);
        const week = parseInt(weekStr2, 10);

        if (isNaN(year) || isNaN(week)) {
          throw new Error('週次フォーマットが不正です');
        }

        // ISO 8601週番号から日付を計算（1月4日を含む週が第1週）
        const jan4 = new Date(year, 0, 4);
        const jan4Day = jan4.getDay() || 7; // 日曜=7
        const mondayOfWeek1 = new Date(jan4);
        mondayOfWeek1.setDate(jan4.getDate() - jan4Day + 1);

        // 指定週の月曜日
        const targetMonday = new Date(mondayOfWeek1);
        targetMonday.setDate(mondayOfWeek1.getDate() + (week - 1) * 7);

        return targetMonday.toISOString().split('T')[0];
      };

      try {
        finalStartDate = weekToDate(startDate);
        finalEndDate = weekToDate(endDate);
      } catch (error) {
        alert('開始週と終了週を設定してください');
        return;
      }
    }

    // バリデーション: 開始日 <= 終了日
    const startDateObj = new Date(finalStartDate);
    const endDateObj = new Date(finalEndDate);

    if (startDateObj > endDateObj) {
      alert('開始日は終了日より前に設定してください');
      return;
    }

    // バリデーション: 期間が空でないこと
    if (!finalStartDate || !finalEndDate) {
      alert('開始日と終了日を設定してください');
      return;
    }

    onConfirm({
      pattern,
      startDate: finalStartDate,
      endDate: finalEndDate,
      includeMilestones,
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => onOpenChange(data.open)}>
      <DialogSurface className={styles.surface}>
        <DialogBody>
          <DialogTitle>ガントチャート設定</DialogTitle>
          <DialogContent className={styles.content}>
            {/* パターン選択 */}
            <Field label="表示パターン">
              <Dropdown
                value={
                  pattern === 'daily'
                    ? '日次'
                    : pattern === 'weekly'
                    ? '週次'
                    : pattern === 'monthly'
                    ? '月次'
                    : '四半期'
                }
                onOptionSelect={(_, data) => {
                  const value = data.optionValue as GanttChartParams['pattern'];
                  setPattern(value);
                }}
              >
                <Option value="daily">日次</Option>
                <Option value="weekly">週次</Option>
                <Option value="monthly">月次</Option>
                <Option value="quarterly">四半期</Option>
              </Dropdown>
            </Field>

            {/* 開始日/月/四半期 */}
            {pattern === 'quarterly' ? (
              <div className={styles.dateField}>
                <Label weight="semibold">開始四半期</Label>
                <div className={styles.dateInputRow}>
                  <Dropdown
                    value={String(startYear)}
                    onOptionSelect={(_, data) => setStartYear(Number(data.optionValue))}
                    className={styles.compactDropdown}
                  >
                    {[currentFiscalYear - 1, currentFiscalYear, currentFiscalYear + 1, currentFiscalYear + 2].map((year) => (
                      <Option key={year} value={String(year)} text={`FY${year}`}>
                        {year}年度
                      </Option>
                    ))}
                  </Dropdown>
                  <Dropdown
                    value={`Q${startQuarter}`}
                    onOptionSelect={(_, data) => setStartQuarter(Number(data.optionValue))}
                    className={styles.compactDropdown}
                  >
                    <Option value="1" text="Q1">Q1</Option>
                    <Option value="2" text="Q2">Q2</Option>
                    <Option value="3" text="Q3">Q3</Option>
                    <Option value="4" text="Q4">Q4</Option>
                  </Dropdown>
                </div>
              </div>
            ) : pattern === 'monthly' ? (
              <div className={styles.dateField}>
                <Label weight="semibold">開始月</Label>
                <div className={styles.dateInputRow}>
                  <Dropdown
                    value={String(startYear)}
                    onOptionSelect={(_, data) => setStartYear(Number(data.optionValue))}
                    className={styles.compactDropdown}
                  >
                    {[currentYear - 1, currentYear, currentYear + 1, currentYear + 2].map((year) => (
                      <Option key={year} value={String(year)} text={`${year}年`}>
                        {year}年
                      </Option>
                    ))}
                  </Dropdown>
                  <Dropdown
                    value={`${startMonth}月`}
                    onOptionSelect={(_, data) => setStartMonth(Number(data.optionValue))}
                    className={styles.compactDropdown}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <Option key={month} value={String(month)} text={`${month}月`}>
                        {month}月
                      </Option>
                    ))}
                  </Dropdown>
                </div>
              </div>
            ) : (
              <div className={styles.dateField}>
                <Label weight="semibold">開始日</Label>
                <input
                  type={pattern === 'weekly' ? 'week' : 'date'}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={styles.dateInput}
                  style={{
                    padding: '8px',
                    fontSize: '14px',
                    border: `1px solid ${tokens.colorNeutralStroke1}`,
                    borderRadius: tokens.borderRadiusMedium,
                    fontFamily: tokens.fontFamilyBase,
                  }}
                />
              </div>
            )}

            {/* 終了日/月/四半期 */}
            {pattern === 'quarterly' ? (
              <div className={styles.dateField}>
                <Label weight="semibold">終了四半期</Label>
                <div className={styles.dateInputRow}>
                  <Dropdown
                    value={String(endYear)}
                    onOptionSelect={(_, data) => setEndYear(Number(data.optionValue))}
                    className={styles.compactDropdown}
                  >
                    {[currentFiscalYear - 1, currentFiscalYear, currentFiscalYear + 1, currentFiscalYear + 2].map((year) => (
                      <Option key={year} value={String(year)} text={`FY${year}`}>
                        {year}年度
                      </Option>
                    ))}
                  </Dropdown>
                  <Dropdown
                    value={`Q${endQuarter}`}
                    onOptionSelect={(_, data) => setEndQuarter(Number(data.optionValue))}
                    className={styles.compactDropdown}
                  >
                    <Option value="1" text="Q1">Q1</Option>
                    <Option value="2" text="Q2">Q2</Option>
                    <Option value="3" text="Q3">Q3</Option>
                    <Option value="4" text="Q4">Q4</Option>
                  </Dropdown>
                </div>
              </div>
            ) : pattern === 'monthly' ? (
              <div className={styles.dateField}>
                <Label weight="semibold">終了月</Label>
                <div className={styles.dateInputRow}>
                  <Dropdown
                    value={String(endYear)}
                    onOptionSelect={(_, data) => setEndYear(Number(data.optionValue))}
                    className={styles.compactDropdown}
                  >
                    {[currentYear - 1, currentYear, currentYear + 1, currentYear + 2].map((year) => (
                      <Option key={year} value={String(year)} text={`${year}年`}>
                        {year}年
                      </Option>
                    ))}
                  </Dropdown>
                  <Dropdown
                    value={`${endMonth}月`}
                    onOptionSelect={(_, data) => setEndMonth(Number(data.optionValue))}
                    className={styles.compactDropdown}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <Option key={month} value={String(month)} text={`${month}月`}>
                        {month}月
                      </Option>
                    ))}
                  </Dropdown>
                </div>
              </div>
            ) : (
              <div className={styles.dateField}>
                <Label weight="semibold">終了日</Label>
                <input
                  type={pattern === 'weekly' ? 'week' : 'date'}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={styles.dateInput}
                  style={{
                    padding: '8px',
                    fontSize: '14px',
                    border: `1px solid ${tokens.colorNeutralStroke1}`,
                    borderRadius: tokens.borderRadiusMedium,
                    fontFamily: tokens.fontFamilyBase,
                  }}
                />
              </div>
            )}

            {/* マイルストーン行 */}
            <Field>
              <Checkbox
                checked={includeMilestones}
                onChange={(_, data) =>
                  setIncludeMilestones(data.checked === true)
                }
                label="マイルストーン行を含める"
              />
            </Field>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={handleCancel}>
              キャンセル
            </Button>
            <Button appearance="primary" onClick={handleConfirm}>
              挿入
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
