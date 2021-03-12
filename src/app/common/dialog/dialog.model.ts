export type TDialogType = 'default' | 'error' | 'warning' | 'success';
export interface IDialogBtn {
    ok?: string;
    cancel?: string;
    close?: string;
    send?: string;
}
export interface DialogData {
    title?: string;
    body: string;
    type: TDialogType;
    height?: string;
    width?: string;
    btn?: IDialogBtn;
    value?: any;
    icon?: any;
    inputPlaceHolder?: string;
    inputAns?: string;
    inputActive?: boolean;
}

export interface IResponseDialog {
    answer: boolean;
    inputAns?: string;
}
