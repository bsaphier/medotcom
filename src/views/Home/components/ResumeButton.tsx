import styled from '@emotion/styled';

const publicResume =
    'https://storage.googleapis.com/resume_ben_saphier/Resume%20-%20Benjamin%20Saphier.pdf';

const Container = styled('div')(() => ({
    position: 'absolute',
    bottom: 48,
    left: 48,
}));

const Button = styled('a')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    borderRadius: 8,
    backgroundColor: theme.colors.background.darker,
    height: 32,
    paddingLeft: 12,
    paddingRight: 12,
    boxShadow: '3px 3px 5px #b8b8b8, -3px -3px 5px #ffffff',
    fontWeight: 300,
    fontSize: '1rem',
    letterSpacing: '-0.025rem',
    textDecoration: 'none',
    cursor: 'pointer',
    color: theme.colors.primary.main,
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
