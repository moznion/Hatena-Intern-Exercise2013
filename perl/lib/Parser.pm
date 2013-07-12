package Parser;
use strict;
use warnings;
use autodie;
use Log;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub parse {
    my $self = shift;

    my @log_object;
    {
        open my $fh, '<', 'log.ltsv';
        while (my $line = <$fh>) {
            my %log;
            for my $log_element (split(/\t/, $line)) {
                my ($key, $value) = $log_element =~ /^([^:]*):(.*)/;
                next if $value eq '-';
                $log{$key} = $value;
            }
            push @log_object, Log->new(%log);
        }
    }
    return \@log_object;
}

1;
