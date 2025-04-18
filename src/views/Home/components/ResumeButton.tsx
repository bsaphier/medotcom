import styled from '@emotion/styled';

const publicResume =
    'https://storage.googleapis.com/resume_ben_saphier/Resume%20-%20Benjamin%20Saphier.pdf';

const Container = styled('div')(() => ({
    position: 'absolute',
    bottom: 48,
    right: 48,
}));

const Button = styled('a')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    borderRadius: 4,
    backgroundColor: theme.colors.primary.main,
    height: 32,
    paddingLeft: 16,
    paddingRight: 16,
    fontWeight: 400,
    fontSize: '1rem',
    letterSpacing: '-0.0125rem',
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.colors.background.default,
    '&:focus-visible': {
        outline: `${theme.colors.primary.main} solid 2px`,
    },
}));

export function ResumeButton() {
    return (
        <Container>
            <Button href={publicResume} target="_blank">
                My Resume
            </Button>
        </Container>
    );
}
