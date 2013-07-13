package LogCounter;
use strict;
use warnings;

sub new {
    my ($class, $logs) = @_;
    return bless { logs => $logs }, $class;
};

sub group_by_user {
}

sub count_error {
    my $self = shift;

    my $errors;
    for my $log (@{$self->{logs}}) {
        $errors++ if $log->{status} =~ /5\d\d/;
    }
    return $errors;
}

1;
