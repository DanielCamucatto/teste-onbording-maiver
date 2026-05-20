import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOnboarding } from '../controllers/useOnboarding';
import { useClients } from '../controllers/useClients';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ProgressBar from '../components/ProgressBar';
import StatusBadge from '../components/StatusBadge';
import { OnboardingStatus } from '../models';
import styles from './OnboardingChecklistView.module.css';

function OnboardingChecklistView() {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { steps, loading, error, fetchSteps, updateStep } = useOnboarding();
  const { clients, fetchClients } = useClients();
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (clientId) {
      fetchSteps(clientId);
      fetchClients();
    }
  }, [clientId, fetchSteps, fetchClients]);

  if (!clientId) {
    return <ErrorMessage message="ID do cliente não encontrado" />;
  }

  const client = clients.find((c) => c.id === clientId);

  if (loading && steps.length === 0) {
    return <LoadingSpinner message="Carregando checklist..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => fetchSteps(clientId)}
      />
    );
  }

  const completedSteps = steps.filter((s) => s.completed).length;
  const totalSteps = steps.length;

  // Determinar status
  const allCompleted = completedSteps === totalSteps;
  const daysSinceStart = client
    ? Math.floor(
        (new Date().getTime() - new Date(client.start_date).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;
  const status = allCompleted
    ? OnboardingStatus.CONCLUIDO
    : daysSinceStart > 30
      ? OnboardingStatus.ATRASADO
      : OnboardingStatus.EM_ANDAMENTO;

  const handleToggleStep = async (stepId: string, currentCompleted: boolean) => {
    await updateStep(clientId, stepId, {
      completed: !currentCompleted,
    });
  };

  const handleSaveNote = async (stepId: string) => {
    const note = noteInputs[stepId] || null;
    await updateStep(clientId, stepId, { note: note || undefined });
    setNoteInputs((prev) => ({ ...prev, [stepId]: '' }));
  };

  const handleNoteChange = (stepId: string, value: string) => {
    setNoteInputs((prev) => ({ ...prev, [stepId]: value }));
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => navigate('/')}
      >
        ← Voltar ao Dashboard
      </button>

      {client && (
        <div className={styles.clientInfo}>
          <div className={styles.clientHeader}>
            <div>
              <h2 className={styles.companyName}>
                {client.company_name}
              </h2>
              <p className={styles.contact}>
                Responsável: {client.contact_name} | Consultor:{' '}
                {client.consultant_name}
              </p>
            </div>
            <StatusBadge status={status} />
          </div>
          <ProgressBar completed={completedSteps} total={totalSteps} />
        </div>
      )}

      <div className={styles.checklist}>
        <h3 className={styles.checklistTitle}>Checklist de Onboarding</h3>

        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`${styles.step} ${step.completed ? styles.stepCompleted : ''}`}
          >
            <div className={styles.stepHeader}>
              <div className={styles.stepInfo}>
                <span className={styles.stepNumber}>{index + 1}</span>
                <span className={styles.stepName}>
                  {step.step_name}
                </span>
                {step.completed && step.completed_at && (
                  <span className={styles.stepDate}>
                    {new Date(step.completed_at).toLocaleDateString(
                      'pt-BR',
                      {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      },
                    )}
                  </span>
                )}
              </div>
              <button
                className={`${styles.checkButton} ${step.completed ? styles.checked : ''}`}
                onClick={() =>
                  handleToggleStep(step.id, step.completed)
                }
                title={
                  step.completed
                    ? 'Desmarcar conclusão'
                    : 'Marcar como concluído'
                }
              >
                {step.completed ? '✓' : '○'}
              </button>
            </div>

            {step.note && (
              <div className={styles.noteDisplay}>
                <span className={styles.noteLabel}>Nota:</span>
                <p className={styles.noteText}>{step.note}</p>
              </div>
            )}

            <div className={styles.noteInput}>
              <input
                type="text"
                className={styles.noteField}
                placeholder="Adicionar nota sobre esta etapa..."
                value={noteInputs[step.id] || ''}
                onChange={(e) =>
                  handleNoteChange(step.id, e.target.value)
                }
              />
              <button
                className={styles.noteSaveButton}
                onClick={() => handleSaveNote(step.id)}
                disabled={!noteInputs[step.id]?.trim()}
              >
                Salvar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnboardingChecklistView;
