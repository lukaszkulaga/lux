

CREATE TABLE [dbo].[klienci](
    [IdKlienta] [int] IDENTITY(1,1) NOT NULL,
    [Nazwa] [nvarchar](255) NULL,
    [NIP] [nvarchar](255) NULL,
    [Podmiot] [int] NULL
    PRIMARY KEY CLUSTERED
(
[IdKlienta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
    GO